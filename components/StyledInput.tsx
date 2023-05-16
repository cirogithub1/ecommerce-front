import styled from 'styled-components'

const Input = styled.input`
	width: 100%;
	padding: 5px;
	margin-bottom: 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-sizing: border-box;
`

function StyledInput(props:any) {
	return (

		<Input {...props}></Input>
	)
}

export default StyledInput