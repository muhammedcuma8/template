import React from "react";
import Card from "../../components/basic/ktnCard"
import Button from "../../components/basic/ktnButton";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();


    return (
        <div className="flex justify-content-center m-5">
            {/* Sample code and content */}
            <Card
                title="Privacy Policy"
                className="shadow-2 surface-card p-5 border-round-xl w-full md:w-6"
                header={<i className="pi pi-lock text-primary text-4xl" />}
            >
                <p className="text-lg line-height-3">
                    Welcome to our Privacy Policy page. Your privacy is important to us.
                    This document explains how we collect, store, and use your personal data.
                </p>

                <h3>Your Data Rights</h3>
                <ul className="list-none ml-3">
                    <li className="mb-2">✔ Access your personal information</li>
                    <li className="mb-2">✔ Request corrections to inaccurate data</li>
                    <li className="mb-2">✔ Request deletion of your personal data</li>
                </ul>

                <p className="mt-4">
                    For more details, feel free to reach out to us using the contact form
                    provided on our website.
                </p>

                <div className="flex justify-content-between mt-5">
                    <Button
                        label="Go Back"
                        icon="pi pi-arrow-left"
                        className="p-button-outlined p-button-secondary"
                        onClick={() => navigate(-1)}
                    />
                </div>
            </Card>
        </div>
    );
};

export default PrivacyPolicyPage;