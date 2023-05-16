import styled, { css } from "styled-components"

import { primary } from "@/lib/colors"

export const generalStyledBtn = css`
	border: 0;
	padding: 5px 15px;
	border-radius: 5px;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	text-decoration: none;
	svg {
		height: 16px;
		margin-right: 5px;
	}
	${(props:any) => props.block && css`
		display: block;
		width:100%;
	`}
	${(props:any) => props.primary && !props.outline && css`
		background-color: ${primary};
		color: #fff;
		border: 1px solid ${primary};
		&:hover{
			background-color: ${primary}
		}
	`}
	${(props:any) => props.primary && props.outline && css`
		background-color: transparent;
		border: 1px solid ${primary};
		color: ${primary};
		&:hover{
			background-color: ${primary};
			color: #fff;
		}
	`}
	${(props:any) => props.white && !props.outline && css`
		background-color: #fff;
		color: #000;
		&:hover{
			background-color: #e0e0e0
		}
	`}
	${(props:any) => props.white && props.outline && css`
		background-color: transparent;
		color: #fff;
		border: 1px solid #fff;
		&:hover{
			background-color: #e0e0e0
		}
	`}
	${(props:any) => props.black && !props.outline && css`
		background-color: #000;
		color: #fff;
		&:hover{
			background-color: #e0e0e0
		}
	`}
	${(props:any) => props.black && props.outline && css`
		background-color: transparent;
		color: #000;
		border: 1px solid #fff;
		&:hover{
			background-color: #e0e0e0
		}
	`}
	${(props:any) => props.size === 'l' && css`
		font-size: 1.2rem;
		padding: 10px 15px;
		svg{
			height: 20px;
		}
	`}
	${(props:any) => props.size === 'sm' && css`
		@media (min-width: 768px) {
			font-size: inherit;
			padding: 5px 10px;
		}
		font-size: .8rem;
		padding: 4px 8px;
		svg{
			height: 12px;
		}
	`}
`

const StyledButton = styled.button`
	${generalStyledBtn}
`
export default function PrimaryBtn({ children, ...rest }:any) {
	return (
		<StyledButton {...rest}> {children} </StyledButton>
	)
}