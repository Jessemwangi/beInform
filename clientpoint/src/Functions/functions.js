

const convertToHtml = (html)=>{
    const doc = new DOMParser().parseFromString(html,'text/html')
    
    return doc.body.innerHTML;
   }

   export default convertToHtml;

