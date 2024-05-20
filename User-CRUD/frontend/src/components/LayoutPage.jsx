import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function LayoutPage() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/adduser">Add User</Link>
          </li>
        </ul>
      </nav>
    <h1>User Management</h1>
    <Outlet />
    </div>
  )
}

export default LayoutPage