

const convertToHtml = (html)=>{
    const doc = new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
   }

   export default convertToHtml;