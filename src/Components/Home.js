import React from 'react';
import Gallery from 'react-grid-gallery'
import './/../Client/CSS/Home.css'

// images
const default_images = 
[
    {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        tags: [{value: "Nature", title: "Nature"}, {value: "Flora", title: "Flora"}],
        caption: "After Rain (Jeshu John - designerspics.com)"
}];

class Home extends React.Component {
    render() {
        return (
            <div>
                <p className="body">
                    lskdj
                </p>
                {/* Various sections */}
                {/* Keep at bottom of the page */}
                <p>Contact Information</p>
            </div>
        );
    }
}

export default Home;