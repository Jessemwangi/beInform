import { Accordion, AccordionSummary, Typography ,AccordionDetails, Container} from '@mui/material';
import axios from 'axios';
import React, { memo, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const HowTo = memo(() => {
    const [expanded, setExpanded] = useState(0);
const [categories,setcategories] = useState([])


useEffect(() =>{
    const url = `${process.env.REACT_APP_BASE_URL}cat/all`;
    const getcateogry = async () =>{
        const {data} = await  axios.get(url, {
            withCredentials: true,
          })
        
        if (data){
            setcategories(data)
        }
    }
    getcateogry()
},[])
  
    return (
        <Container>
        {categories && categories.map((category) => (
            <Accordion
            className={`helpAccordion ${expanded === category.catid ? 'expanded' : ''}`}
              key={category.catid}
              expanded={expanded === category.catid}
              onChange={() => setExpanded(category.catid)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${category.name}-content`}
                id={`${category.name}-header`}
              >
                <Typography className={`help-typography ${expanded === category.catid ? 'expanded' : ''}`} >{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{category.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
    );
});

export default HowTo;