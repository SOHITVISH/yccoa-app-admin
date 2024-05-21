
import { Fragment, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { ListGroup, Accordion, Card, Badge } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import AdminDashboardMenu, { DashboardMenu } from "routes/AdminDashboardRoutes";
import CompanyDashboardMenu from "routes/CompanyDashboardRoute";
import Cookies from "js-cookie";
import UserAdminDashboard from "routes/UserAdminDashboard.js";
// import { Context as AuthContext } from "../../contextApi/AuthContext.js";



const NavbarVertical = (props) => {
  // const location = useRouter();
  // const { getSingleCompany, state } = useContext(AuthContext)
  // const router = useRouter()
  let userType = Cookies.get('user_type_id');
  let company_name = Cookies.get('companyName');
  let company_name_admin = Cookies.get('companyNameAdmin');
  // console.log(companyID, "__________________ccccccccccccccccc");

  // useEffect(() => {
  //   if (router.isReady) {
  //     getSingleCompany({ id: companyID })
  //   }

  // }, [router])
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Fragment>
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <div className="nav-scroller">
        
            {/* <Image src="/images/yccoalogo.jpg" alt="" /> */}
            <h3 style={{ fontSize: 20, textAlign:"left",  paddingLeft:"20px",marginTop:"10px", color: "white" }} className="text-white">Time Management</h3>
            {/* <p style={{ fontSize: 13, color: "white" }}>York County Council on Aging</p> */}

        </div>
        {/* Dashboard Menu */}

        {
          userType == 1 ?
            <Accordion
              defaultActiveKey="0"
              as="ul"
              className="navbar-nav flex-column"
            >

              {AdminDashboardMenu.map(function (menu, index) {
                // {CompanyDashboardMenu.map(function (menu, index) {
                if (menu.grouptitle) {
                  return (
                    <Card bsPrefix="nav-item" key={index}>
                      {/* group title item */}
                      <div className="navbar-heading">{menu.title}</div>
                      {/* end of group title item */}
                    </Card>
                  );
                } else {
                  if (menu.children) {
                    return (
                      <Fragment key={index}>
                        {/* main menu / root menu level / root items */}
                        <CustomToggle eventKey={index} icon={menu.icon}>
                          {menu.title}
                          {menu.badge ? (
                            <Badge
                              className="ms-1"
                              bg={menu.badgecolor ? menu.badgecolor : "primary"}
                            >
                              {menu.badge}
                            </Badge>
                          ) : (
                            ""
                          )}
                        </CustomToggle>
                        <Accordion.Collapse
                          eventKey={index}
                          as="li"
                          bsPrefix="nav-item"
                        >
                          <ListGroup
                            as="ul"
                            bsPrefix=""
                            className="nav flex-column"
                          >
                            {menu.children.map(function (
                              menuLevel1Item,
                              menuLevel1Index
                            ) {
                              if (menuLevel1Item.children) {
                                return (
                                  <ListGroup.Item
                                    as="li"
                                    bsPrefix="nav-item"
                                    key={menuLevel1Index}
                                  >
                                    {/* first level menu started  */}
                                    <Accordion
                                      defaultActiveKey="0"
                                      className="navbar-nav flex-column"
                                    >
                                      <CustomToggleLevel2 eventKey={0}>
                                        {menuLevel1Item.title}
                                        {menuLevel1Item.badge ? (
                                          <Badge
                                            className="ms-1"
                                            bg={
                                              menuLevel1Item.badgecolor
                                                ? menuLevel1Item.badgecolor
                                                : "primary"
                                            }
                                          >
                                            {menuLevel1Item.badge}
                                          </Badge>
                                        ) : (
                                          ""
                                        )}
                                      </CustomToggleLevel2>
                                      <Accordion.Collapse
                                        eventKey={0}
                                        bsPrefix="nav-item"
                                      >
                                        <ListGroup
                                          as="ul"
                                          bsPrefix=""
                                          className="nav flex-column"
                                        >
                                          {/* second level menu started  */}
                                          {menuLevel1Item.children.map(function (
                                            menuLevel2Item,
                                            menuLevel2Index
                                          ) {
                                            if (menuLevel2Item.children) {
                                              return (
                                                <ListGroup.Item
                                                  as="li"
                                                  bsPrefix="nav-item"
                                                  key={menuLevel2Index}
                                                >
                                                  {/* second level accordion menu started  */}
                                                  <Accordion
                                                    defaultActiveKey="0"
                                                    className="navbar-nav flex-column"
                                                  >
                                                    <CustomToggleLevel2
                                                      eventKey={0}
                                                    >
                                                      {menuLevel2Item.title}
                                                      {menuLevel2Item.badge ? (
                                                        <Badge
                                                          className="ms-1"
                                                          bg={
                                                            menuLevel2Item.badgecolor
                                                              ? menuLevel2Item.badgecolor
                                                              : "primary"
                                                          }
                                                        >
                                                          {menuLevel2Item.badge}
                                                        </Badge>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </CustomToggleLevel2>
                                                    <Accordion.Collapse
                                                      eventKey={0}
                                                      bsPrefix="nav-item"
                                                    >
                                                      <ListGroup
                                                        as="ul"
                                                        bsPrefix=""
                                                        className="nav flex-column"
                                                      >
                                                        {/* third level menu started  */}
                                                        {menuLevel2Item.children.map(
                                                          function (
                                                            menuLevel3Item,
                                                            menuLevel3Index
                                                          ) {
                                                            return (
                                                              <ListGroup.Item
                                                                key={
                                                                  menuLevel3Index
                                                                }
                                                                as="li"
                                                                bsPrefix="nav-item"
                                                              >
                                                                {generateLink(
                                                                  menuLevel3Item
                                                                )}
                                                              </ListGroup.Item>
                                                            );
                                                          }
                                                        )}
                                                        {/* end of third level menu  */}
                                                      </ListGroup>
                                                    </Accordion.Collapse>
                                                  </Accordion>
                                                  {/* end of second level accordion */}
                                                </ListGroup.Item>
                                              );
                                            } else {
                                              return (
                                                <ListGroup.Item
                                                  key={menuLevel2Index}
                                                  as="li"
                                                  bsPrefix="nav-item"
                                                >
                                                  {generateLink(menuLevel2Item)}
                                                </ListGroup.Item>
                                              );
                                            }
                                          })}
                                          {/* end of second level menu  */}
                                        </ListGroup>
                                      </Accordion.Collapse>
                                    </Accordion>
                                    {/* end of first level menu */}
                                  </ListGroup.Item>
                                );
                              } else {
                                return (
                                  <ListGroup.Item
                                    as="li"
                                    bsPrefix="nav-item"
                                    key={menuLevel1Index}
                                  >
                                    {/* first level menu items */}
                                    {generateLink(menuLevel1Item)}
                                    {/* end of first level menu items */}
                                  </ListGroup.Item>
                                );
                              }
                            })}
                          </ListGroup>
                        </Accordion.Collapse>
                        {/* end of main menu / menu level 1 / root items */}
                      </Fragment>
                    );
                  } else {
                    return (
                      <Card bsPrefix="nav-item" key={index}>
                        {/* menu item without any childern items like Documentation and Changelog items*/}
                        <Link
                          href={menu.link}
                          className={`nav-link ${location.pathname === menu.link ? "active" : ""
                            }`}
                        >
                          {typeof menu.icon === "string" ? (
                            <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                          ) : (
                            menu.icon
                          )}
                          {menu.title}
                          {menu.badge ? (
                            <Badge
                              className="ms-1"
                              bg={menu.badgecolor ? menu.badgecolor : "primary"}
                            >
                              {menu.badge}
                            </Badge>
                          ) : (
                            ""
                          )}
                        </Link>
                        {/* end of menu item without any childern items */}
                      </Card>
                    );
                  }
                }
              })}

            </Accordion>
            :
            userType == 2 ?
              <Accordion
                defaultActiveKey="0"
                as="ul"
                className="navbar-nav flex-column"
              >
                <p style={{ fontSize: 13, color: "white", marginLeft: "25px" }}>{company_name}</p>
                {CompanyDashboardMenu.map(function (menu, index) {
                  // {CompanyDashboardMenu.map(function (menu, index) {
                  if (menu.grouptitle) {
                    return (

                      <Card bsPrefix="nav-item" key={index}>
                        {/* group title item */}
                        <div className="navbar-heading">{menu.title}</div>
                        {/* end of group title item */}
                      </Card>
                    );
                  } else {
                    if (menu.children) {
                      return (
                        <Fragment key={index}>
                          {/* main menu / root menu level / root items */}
                          <CustomToggle eventKey={index} icon={menu.icon}>
                            {menu.title}
                            {menu.badge ? (
                              <Badge
                                className="ms-1"
                                bg={menu.badgecolor ? menu.badgecolor : "primary"}
                              >
                                {menu.badge}
                              </Badge>
                            ) : (
                              ""
                            )}
                          </CustomToggle>
                          <Accordion.Collapse
                            eventKey={index}
                            as="li"
                            bsPrefix="nav-item"
                          >
                            <ListGroup
                              as="ul"
                              bsPrefix=""
                              className="nav flex-column"
                            >
                              {menu.children.map(function (
                                menuLevel1Item,
                                menuLevel1Index
                              ) {
                                if (menuLevel1Item.children) {
                                  return (
                                    <ListGroup.Item
                                      as="li"
                                      bsPrefix="nav-item"
                                      key={menuLevel1Index}
                                    >
                                      {/* first level menu started  */}
                                      <Accordion
                                        defaultActiveKey="0"
                                        className="navbar-nav flex-column"
                                      >
                                        <CustomToggleLevel2 eventKey={0}>
                                          {menuLevel1Item.title}
                                          {menuLevel1Item.badge ? (
                                            <Badge
                                              className="ms-1"
                                              bg={
                                                menuLevel1Item.badgecolor
                                                  ? menuLevel1Item.badgecolor
                                                  : "primary"
                                              }
                                            >
                                              {menuLevel1Item.badge}
                                            </Badge>
                                          ) : (
                                            ""
                                          )}
                                        </CustomToggleLevel2>
                                        <Accordion.Collapse
                                          eventKey={0}
                                          bsPrefix="nav-item"
                                        >
                                          <ListGroup
                                            as="ul"
                                            bsPrefix=""
                                            className="nav flex-column"
                                          >
                                            {/* second level menu started  */}
                                            {menuLevel1Item.children.map(function (
                                              menuLevel2Item,
                                              menuLevel2Index
                                            ) {
                                              if (menuLevel2Item.children) {
                                                return (
                                                  <ListGroup.Item
                                                    as="li"
                                                    bsPrefix="nav-item"
                                                    key={menuLevel2Index}
                                                  >
                                                    {/* second level accordion menu started  */}
                                                    <Accordion
                                                      defaultActiveKey="0"
                                                      className="navbar-nav flex-column"
                                                    >
                                                      <CustomToggleLevel2
                                                        eventKey={0}
                                                      >
                                                        {menuLevel2Item.title}
                                                        {menuLevel2Item.badge ? (
                                                          <Badge
                                                            className="ms-1"
                                                            bg={
                                                              menuLevel2Item.badgecolor
                                                                ? menuLevel2Item.badgecolor
                                                                : "primary"
                                                            }
                                                          >
                                                            {menuLevel2Item.badge}
                                                          </Badge>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </CustomToggleLevel2>
                                                      <Accordion.Collapse
                                                        eventKey={0}
                                                        bsPrefix="nav-item"
                                                      >
                                                        <ListGroup
                                                          as="ul"
                                                          bsPrefix=""
                                                          className="nav flex-column"
                                                        >
                                                          {/* third level menu started  */}
                                                          {menuLevel2Item.children.map(
                                                            function (
                                                              menuLevel3Item,
                                                              menuLevel3Index
                                                            ) {
                                                              return (
                                                                <ListGroup.Item
                                                                  key={
                                                                    menuLevel3Index
                                                                  }
                                                                  as="li"
                                                                  bsPrefix="nav-item"
                                                                >
                                                                  {generateLink(
                                                                    menuLevel3Item
                                                                  )}
                                                                </ListGroup.Item>
                                                              );
                                                            }
                                                          )}
                                                          {/* end of third level menu  */}
                                                        </ListGroup>
                                                      </Accordion.Collapse>
                                                    </Accordion>
                                                    {/* end of second level accordion */}
                                                  </ListGroup.Item>
                                                );
                                              } else {
                                                return (
                                                  <ListGroup.Item
                                                    key={menuLevel2Index}
                                                    as="li"
                                                    bsPrefix="nav-item"
                                                  >
                                                    {generateLink(menuLevel2Item)}
                                                  </ListGroup.Item>
                                                );
                                              }
                                            })}
                                            {/* end of second level menu  */}
                                          </ListGroup>
                                        </Accordion.Collapse>
                                      </Accordion>
                                      {/* end of first level menu */}
                                    </ListGroup.Item>
                                  );
                                } else {
                                  return (
                                    <ListGroup.Item
                                      as="li"
                                      bsPrefix="nav-item"
                                      key={menuLevel1Index}
                                    >
                                      {/* first level menu items */}
                                      {generateLink(menuLevel1Item)}
                                      {/* end of first level menu items */}
                                    </ListGroup.Item>
                                  );
                                }
                              })}
                            </ListGroup>
                          </Accordion.Collapse>
                          {/* end of main menu / menu level 1 / root items */}
                        </Fragment>
                      );
                    } else {
                      return (
                        <Card bsPrefix="nav-item" key={index}>
                          {/* menu item without any childern items like Documentation and Changelog items*/}
                          <Link
                            href={menu.link}
                            className={`nav-link ${location.pathname === menu.link ? "active" : ""
                              }`}
                          >
                            {typeof menu.icon === "string" ? (
                              <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                            ) : (
                              menu.icon
                            )}
                            {menu.title}
                            {menu.badge ? (
                              <Badge
                                className="ms-1"
                                bg={menu.badgecolor ? menu.badgecolor : "primary"}
                              >
                                {menu.badge}
                              </Badge>
                            ) : (
                              ""
                            )}
                          </Link>
                          {/* end of menu item without any childern items */}
                        </Card>
                      );
                    }
                  }
                })}

              </Accordion>
              :
              userType == 3 ?
                <Accordion
                  defaultActiveKey="0"
                  as="ul"
                  className="navbar-nav flex-column"
                >
                  <p style={{ fontSize: 13, color: "white", marginLeft: "25px" }}>{company_name_admin}</p>
                  {UserAdminDashboard.map(function (menu, index) {
                    // {CompanyDashboardMenu.map(function (menu, index) {
                    if (menu.grouptitle) {
                      return (

                        <Card bsPrefix="nav-item" key={index}>
                          {/* group title item */}
                          <div className="navbar-heading">{menu.title}</div>
                          {/* end of group title item */}
                        </Card>
                      );
                    } else {
                      if (menu.children) {
                        return (
                          <Fragment key={index}>
                            {/* main menu / root menu level / root items */}
                            <CustomToggle eventKey={index} icon={menu.icon}>
                              {menu.title}
                              {menu.badge ? (
                                <Badge
                                  className="ms-1"
                                  bg={menu.badgecolor ? menu.badgecolor : "primary"}
                                >
                                  {menu.badge}
                                </Badge>
                              ) : (
                                ""
                              )}
                            </CustomToggle>
                            <Accordion.Collapse
                              eventKey={index}
                              as="li"
                              bsPrefix="nav-item"
                            >
                              <ListGroup
                                as="ul"
                                bsPrefix=""
                                className="nav flex-column"
                              >
                                {menu.children.map(function (
                                  menuLevel1Item,
                                  menuLevel1Index
                                ) {
                                  if (menuLevel1Item.children) {
                                    return (
                                      <ListGroup.Item
                                        as="li"
                                        bsPrefix="nav-item"
                                        key={menuLevel1Index}
                                      >
                                        {/* first level menu started  */}
                                        <Accordion
                                          defaultActiveKey="0"
                                          className="navbar-nav flex-column"
                                        >
                                          <CustomToggleLevel2 eventKey={0}>
                                            {menuLevel1Item.title}
                                            {menuLevel1Item.badge ? (
                                              <Badge
                                                className="ms-1"
                                                bg={
                                                  menuLevel1Item.badgecolor
                                                    ? menuLevel1Item.badgecolor
                                                    : "primary"
                                                }
                                              >
                                                {menuLevel1Item.badge}
                                              </Badge>
                                            ) : (
                                              ""
                                            )}
                                          </CustomToggleLevel2>
                                          <Accordion.Collapse
                                            eventKey={0}
                                            bsPrefix="nav-item"
                                          >
                                            <ListGroup
                                              as="ul"
                                              bsPrefix=""
                                              className="nav flex-column"
                                            >
                                              {/* second level menu started  */}
                                              {menuLevel1Item.children.map(function (
                                                menuLevel2Item,
                                                menuLevel2Index
                                              ) {
                                                if (menuLevel2Item.children) {
                                                  return (
                                                    <ListGroup.Item
                                                      as="li"
                                                      bsPrefix="nav-item"
                                                      key={menuLevel2Index}
                                                    >
                                                      {/* second level accordion menu started  */}
                                                      <Accordion
                                                        defaultActiveKey="0"
                                                        className="navbar-nav flex-column"
                                                      >
                                                        <CustomToggleLevel2
                                                          eventKey={0}
                                                        >
                                                          {menuLevel2Item.title}
                                                          {menuLevel2Item.badge ? (
                                                            <Badge
                                                              className="ms-1"
                                                              bg={
                                                                menuLevel2Item.badgecolor
                                                                  ? menuLevel2Item.badgecolor
                                                                  : "primary"
                                                              }
                                                            >
                                                              {menuLevel2Item.badge}
                                                            </Badge>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </CustomToggleLevel2>
                                                        <Accordion.Collapse
                                                          eventKey={0}
                                                          bsPrefix="nav-item"
                                                        >
                                                          <ListGroup
                                                            as="ul"
                                                            bsPrefix=""
                                                            className="nav flex-column"
                                                          >
                                                            {/* third level menu started  */}
                                                            {menuLevel2Item.children.map(
                                                              function (
                                                                menuLevel3Item,
                                                                menuLevel3Index
                                                              ) {
                                                                return (
                                                                  <ListGroup.Item
                                                                    key={
                                                                      menuLevel3Index
                                                                    }
                                                                    as="li"
                                                                    bsPrefix="nav-item"
                                                                  >
                                                                    {generateLink(
                                                                      menuLevel3Item
                                                                    )}
                                                                  </ListGroup.Item>
                                                                );
                                                              }
                                                            )}
                                                            {/* end of third level menu  */}
                                                          </ListGroup>
                                                        </Accordion.Collapse>
                                                      </Accordion>
                                                      {/* end of second level accordion */}
                                                    </ListGroup.Item>
                                                  );
                                                } else {
                                                  return (
                                                    <ListGroup.Item
                                                      key={menuLevel2Index}
                                                      as="li"
                                                      bsPrefix="nav-item"
                                                    >
                                                      {generateLink(menuLevel2Item)}
                                                    </ListGroup.Item>
                                                  );
                                                }
                                              })}
                                              {/* end of second level menu  */}
                                            </ListGroup>
                                          </Accordion.Collapse>
                                        </Accordion>
                                        {/* end of first level menu */}
                                      </ListGroup.Item>
                                    );
                                  } else {
                                    return (
                                      <ListGroup.Item
                                        as="li"
                                        bsPrefix="nav-item"
                                        key={menuLevel1Index}
                                      >
                                        {/* first level menu items */}
                                        {generateLink(menuLevel1Item)}
                                        {/* end of first level menu items */}
                                      </ListGroup.Item>
                                    );
                                  }
                                })}
                              </ListGroup>
                            </Accordion.Collapse>
                            {/* end of main menu / menu level 1 / root items */}
                          </Fragment>
                        );
                      } else {
                        return (
                          <Card bsPrefix="nav-item" key={index}>
                            {/* menu item without any childern items like Documentation and Changelog items*/}
                            <Link
                              href={menu.link}
                              className={`nav-link ${location.pathname === menu.link ? "active" : ""
                                }`}
                            >
                              {typeof menu.icon === "string" ? (
                                <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                              ) : (
                                menu.icon
                              )}
                              {menu.title}
                              {menu.badge ? (
                                <Badge
                                  className="ms-1"
                                  bg={menu.badgecolor ? menu.badgecolor : "primary"}
                                >
                                  {menu.badge}
                                </Badge>
                              ) : (
                                ""
                              )}
                            </Link>
                            {/* end of menu item without any childern items */}
                          </Card>
                        );
                      }
                    }
                  })}

                </Accordion> :
                ""


        }

        {/* end of Dashboard Menu */}
      </SimpleBar>
    </Fragment>
  );
};

export default NavbarVertical;
