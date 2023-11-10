import React from 'react';

function AuthorHeader() {
    return (
        <header className="masthead" style={{backgroundImage: `url("https://xdcs.cdnchinhphu.vn/446259493575335936/2023/8/23/dhxd-1692750442833376701747.jpg")`}}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <table style={{width: '100%'}}>
                            <tr>
                                <td>
                                    <div>
                                        <img 
                                            src='https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/340966263_633263335309671_3441202165600059568_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GvH03ZifAYwAX8Y_n-n&_nc_ht=scontent.fhan19-1.fna&oh=00_AfDZ9WbIc3_96FW508pkS5qtD8jYySBdwtHHt6Q7zPEoug&oe=6552C820'
                                            style={{
                                                width:220, 
                                                height:220,
                                                borderRadius:'50%'
                                            }}
                                        />
                                    </div>
                                </td>
                                <td colSpan={2}> 
                                    <div className="site-heading">
                                        <h2>Lê Quang Huy</h2>
                                        <span className="subheading">
                                            <i>
                                                "Một câu quote gì đó"
                                            </i>
                                            <img height="25" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Vietnam-Animated.gif" style={{ marginLeft: '5px' }} ></img>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AuthorHeader;
