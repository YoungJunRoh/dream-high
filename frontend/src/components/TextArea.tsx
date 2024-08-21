import React, { ReactNode } from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type TextAreaProps = {
    onChange?(parm?: any): void;
    placeholder?: string;
    children?: ReactNode;
    height: string;
    width: string;
    fontSize: string;
}

const TextAreaForm = styled.textarea<TextAreaProps>`
height: ${(props) => props.height};
width: ${(props) => props.width};
border: 5px solid black;
padding: 10px;
font-size: ${(props) => props.fontSize};
margin-bottom: 5px;
resize: none;
`;



const TextArea: React.FC<TextAreaProps> = ({ onChange, placeholder, children, height, width, fontSize }) => {
    return (
        <TextAreaForm
            className='font-normal'
            placeholder={placeholder}
            onChange={onChange}
            height={height}
            width={width}
            fontSize={fontSize}
        >
            {children}
        </TextAreaForm>
    );
}

export default TextArea;