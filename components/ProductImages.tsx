import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import css from "styled-jsx/css"

const ImageWapper = styled.div`
	text-align: center;
`

const  ImagesList = styled.div` 
	display: flex;
	gap: 10px;
` 

interface ImageProps {
  active: boolean;
}

const ImageItem = styled.div<ImageProps>`
	cursor: pointer;
	${(props:any) => props.active 
		? 'box-shadow: 3px 3px 3px 0px rgba(99, 250, 39, 0.4)'
		: 'box-shadow: 2px 2px 2px 0px rgba(0,0,0,.1);' 
	}
`

function ProductImages({ images } : any) {
	const [activeImage, setActiveImage] = useState(images?.[0])
	
	return (
		<div>
			<ImageWapper>
				<Image
					style={{maxWidth: '100%', maxHeight: '100%'}}
					src={activeImage}
					alt={activeImage}
					width={280}
					height={280} />
			</ImageWapper>

			<ImagesList>
				{images.map((image : any, index : any) => (
					<ImageItem key={index}
						active={image === activeImage}
						onClick={() => setActiveImage(image)}>
						<Image
							src={image}
							alt={image}
							width={60}
							height={60} />			
					</ImageItem>					
				))}
			</ImagesList>

		</div>
	)
}

export default ProductImages