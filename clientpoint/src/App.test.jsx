import BackToTop from "./pages/BackToTop";
import { render,screen } from '@testing-library/react';
import Login from "./pages/Login";
test('on initial render login button be disabled and when username and password enter enabled',() => { 
    render(<Login/>);

    screen.debug();
 })