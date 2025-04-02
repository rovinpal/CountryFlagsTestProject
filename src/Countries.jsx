import React, { useState, useEffect } from "react";

const CountryFlags = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountries = async () => {
        try{
            const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
            if(!response.ok){
                throw new Error("Failed to fetch Country Data!");
            }
            const data = await response.json();
            setCountries(data);
        } catch(error) {
            console.error("Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div 
            style={{
                display: "grid", 
                gridTemplateColumns: "repeat(6, 1fr)", 
                gap: "20px", 
                justifyContent: "center", 
                padding: "20px"}}
        >
            {countries.map((country) => (
                <div 
                    key={country.abbr}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9"
                    }}
                >
                    <img 
                        src={country.flag} 
                        alt={`${country.name}`}
                        style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover"
                        }}
                    />
                    <h3 style={{ marginTop: "10px" }}>{country.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default CountryFlags;