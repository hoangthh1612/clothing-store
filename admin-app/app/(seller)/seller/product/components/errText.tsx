import React from "react";

const ErrorText = (props: any) => {
    return (
        <>
            <p className="text-red-500">{props.children}</p>
        </>
    )
}

export default ErrorText;