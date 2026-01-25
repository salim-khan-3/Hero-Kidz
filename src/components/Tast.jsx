"use client"
import React from 'react';
import { useSession } from "next-auth/react";

const Tast = () => {
    const session = useSession();
    return (
        <div>
            {
                JSON.stringify(session)
            }
        </div>
    );
};

export default Tast;



