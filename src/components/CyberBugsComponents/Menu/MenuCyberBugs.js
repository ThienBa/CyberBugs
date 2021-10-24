import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../../assets/img/download.jfif").default} alt="1" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>

                    <NavLink to="/cyberbugs" style={{ color: "black" }} activeClassName="font-weight-bold text-info"><i className="fa fa-credit-card" />Cyber Board</NavLink>
                </div>
                <div>
                    <NavLink to="/projectmanagementcyberbugs" style={{ color: "black" }} activeClassName="font-weight-bold text-info"><i className="fa fa-list" />Project Management</NavLink>
                </div>
                <div>
                    <NavLink to="/createprojectcyberbugs" style={{ color: "black" }} activeClassName="font-weight-bold text-info"><i className="fa fa-cog" />Create Project</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>

    )
}
