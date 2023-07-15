import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';
import { useCsrfToken } from "./WithCsrfToken";
import { useUserinfo } from "./WithUserinfo";
import { useHttp } from "./http";

function Home() {
  const [userinfo, refreshUserinfo] = useUserinfo();
  const [, refreshCsrfToken] = useCsrfToken();
  const http = useHttp();
  const logout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await http.postForm("/api/logout", {});
    refreshUserinfo();
    refreshCsrfToken();
  };

  const { pathname } = useLocation();
  return (
    <div className="container py-3">
      <div className='row'>
        <div className='col'>
          React + Spring Boot example
        </div>
        <div className='col-2'>
          username: {userinfo.name}
        </div>
        <div className='col-1'>
          <button onClick={logout} className='btn btn-primary'>Logout</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <ul className='nav flex-column'>
            <li className="nav-item"><Link className={`nav-link ${pathname === "/" ? "active" : ""}`} to="/">Home</Link></li>
            <li className="nav-item"><Link className={`nav-link ${pathname === "/sse" ? "active" : ""}`} to="/sse">Server-Sent Events</Link></li>
          </ul>
        </div>
        <div className='col-9'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
