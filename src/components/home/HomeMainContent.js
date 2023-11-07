import React from 'react';
import PostCardList from './PostCardList';

function MainContent() {
    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-12 col-lg-11 col-xl-10">
                    <PostCardList/>
                    <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
