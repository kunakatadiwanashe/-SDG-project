
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './(pages)/home/page';


export default function Home() {
  return (
    <div>
     
     <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>

    </div>

  );
}
