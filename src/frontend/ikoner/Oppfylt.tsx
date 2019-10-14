import * as React from 'react';

interface IOppfylt {
    className?: string;
    heigth?: number;
    width?: number;
}

const Oppfylt: React.StatelessComponent<IOppfylt> = ({ className, heigth, width }) => {
    return (
        <svg
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none" fillRule="nonzero">
                <path
                    fill="#1C6937"
                    d="M10 0C4.486 0 0 4.142 0 9.23c0 5.09 4.486 9.232 10 9.232 5.513 0 10-4.142 10-9.231C20 4.14 15.513 0 10 0z"
                />
                <path
                    fill="#FFF"
                    d="M8.033 11.109l5.384-4.492a.881.881 0 0 1 1.147.034.673.673 0 0 1-.039 1.026L8.567 12.65a.868.868 0 0 1-.552.194.865.865 0 0 1-.575-.212l-1.985-1.776a.673.673 0 0 1 0-1.025.881.881 0 0 1 1.147 0l1.431 1.279z"
                />
            </g>
        </svg>
    );
};

export default Oppfylt;
