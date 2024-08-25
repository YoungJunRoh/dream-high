import React, { ReactNode } from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type InputProps = {
    onChange?(parm?: any): void;
    onKeyDown?(parm?: any): void;
    placeholder?: string;
    children?: ReactNode;
    m_height: string;
    m_width: string;
    m_fontSize: string;
    w_height: string;
    w_width: string;
    w_fontSize: string;
    type?:string;
}

const InputForm = styled.input<InputProps>`
height: ${(props) => props.w_height};
width: ${(props) => props.w_width};
border: 5px solid black;
padding: 10px;
font-size: ${(props) => props.w_fontSize};
margin-bottom: 5px;
resize: none;
position: relative;
white-space: nowrap; /* 자동 줄내림 막기 */
overflow: hidden; /* 스크롤 막기 */
type: ${(props) => props.type};

@media all and (max-width:430px) {
height: ${(props) => props.m_height};
width: ${(props) => props.m_width};
border: 5px solid black;
padding: 10px;
font-size: ${(props) => props.m_fontSize};
margin-bottom: 5px;
resize: none;
position: relative;
type: ${(props) => props.type};
}
`;

const TextArea: React.FC<InputProps> = ({ onChange, onKeyDown, type, placeholder, children, m_height, m_width, m_fontSize, w_height, w_width, w_fontSize }) => {
    return (
        <InputForm
            className='font-normal'
            placeholder={placeholder}
            onChange={onChange}
            m_height={m_height}
            m_width={m_width}
            m_fontSize={m_fontSize}
            w_height={w_height}
            w_width={w_width}
            w_fontSize={w_fontSize}
            onKeyDown={onKeyDown}
            type={type}
        >
            {children}
        </InputForm>
    );
}

export default TextArea;