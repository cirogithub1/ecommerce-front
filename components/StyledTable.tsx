import styled from 'styled-components'

const Table = styled.table`
	width: 100%;
	th{
		text-align: left;
		text-transform: uppercase;
		color: #b8b8b8;
		font-weight: bold;
		font-size: 12px;
	}
	td{
		border-top: 1px solid rgba(0,0,0,.1);
	}
`

export default function StyledTable({ children, ...props } : any) {
	return(
		<Table {...props}> {children} </Table>
	)
}