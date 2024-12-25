import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

const initialFormData = {
    types: [],
    date: new Date(),
    time: new Date(),
    location: "",
    evidence: {assets: []},
    isAnonymous: false,
    harasserDetails: "",
    additionalInfo: ""
}

export const ReportProvider = ({ children }) => {
    const [formData, setFormData] = useState(initialFormData);

    const changeValue = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const clearValue = (key) => {
        setFormData((prev) => ({ ...prev, [key]: initialFormData[key] }));
    }

    const resetData = (key) => {
        setFormData(initialFormData);
    }

    return (
        <ReportContext.Provider value={{ formData, changeValue, clearValue, resetData }}>
            {children}
        </ReportContext.Provider>
    );
}

export const useReportContext = () => useContext(ReportContext);

