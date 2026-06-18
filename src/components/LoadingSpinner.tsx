import { IonSpinner } from "@ionic/react";
import React from "react";

const LoadingSpinner: React.FC = () => {
    return(
        <div className="loading-overlay">
            <IonSpinner name="circular" color="primary" className="LoadingSpinner"/>
        </div>
    )
};

export default LoadingSpinner