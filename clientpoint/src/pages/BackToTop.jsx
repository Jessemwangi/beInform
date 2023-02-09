import React from 'react';

import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";

import Fade from "@mui/material/Fade";

const BackToTop = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100 // pixel for scroll height
    });
  
    const handleClick = (event) => {
      const anchor = (document).querySelector(
        "#back-to-top-anchor"
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          block: "center"
        });
      }
    };
    return (
        <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 105, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
};

export default BackToTop;