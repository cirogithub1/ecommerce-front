import Link from "next/link"
import styled from "styled-components"

import { generalStyledBtn } from "./StyledButton"

const StyledLink = styled(Link)`
	${generalStyledBtn}
`

export default function LinkButton(props:any) {
	return (
		<StyledLink {...props} />
	)
}