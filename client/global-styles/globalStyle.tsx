import { createGlobalStyle } from 'styled-components'
import { colors, fonts, fontSizes, lineHeights, sizes } from './variables'

export const GlobalStyle = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
  p {
    color: ${colors.black};
    font-family: ${fonts.poppins};
  }

  h1 {
    font-size: ${fontSizes.extraExtraLarge};
    line-height: ${lineHeights.extraExtraLarge};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.large};
      line-height: ${lineHeights.large};
    }
  }

  h2 {
    font-size: ${fontSizes.extraLarge};
    line-height: ${lineHeights.extraLarge};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.medium};
      line-height: ${lineHeights.medium};
    }
  }

  h3 {
    font-size: ${fontSizes.large};
    line-height: ${lineHeights.large};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.small};
      line-height: ${lineHeights.small};
    }
  }

  h4 {
    font-size: ${fontSizes.medium};
    line-height: ${lineHeights.medium};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.small};
      line-height: ${lineHeights.small};
    }
  }

  h5 {
    font-size : ${fontSizes.small};
    line-height: ${lineHeights.small};
  }

  h6 {
    font-size : ${fontSizes.extraSmall};
    line-height: ${lineHeights.extraExtraLarge};
  }

  p {
    font-size: ${fontSizes.extraExtraSmall};
    line-height: ${lineHeights.extraExtraSmall};
  }
`
