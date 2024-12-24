import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        types: [],
        date: new Date(),
        time: new Date(),
        location: "",
        evidence: {assets: []},
        isAnonymous: false,
        harasserDetails: "",
        additionalInfo: ""
    });

    const changeValue = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <ReportContext.Provider value={{ formData, changeValue }}>
            {children}
        </ReportContext.Provider>
    );
}

export const useReportContext = () => useContext(ReportContext);

