import React from 'react';
import '../Client/CSS/Testimonials.css'
import Gallery from 'react-grid-gallery'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const doug_and_sue_images =
[{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
}]

class Testimonials extends React.Component {
    render() {
        return (
            <div> 
                <h2>See what people are saying...</h2>
                <section className="testimonial-body" id="doug_and_sue">
                    <p>"Dependable, trustworthy, and expert workmanship all 
                        describe Kevin and his business.  
                        He completely transformed our condo, painting it from top to 
                        bottom, among other projects.
                        Not only does he do excellent work, but he's a 
                        pleasure to have in your home. For any future projects, 
                        there's no one we'd rather have than Kevin." 
                        <span class="testimonial-signature"> - Doug and Sue &sdot; Brookfield, WI</span>
                    </p>
                    <Gallery images={doug_and_sue_images} 
                                backdropClosesModal={true}
                                enableKeyboardInput={true}
                                enableImageSelection={false}/>
                </section>
                <section className="testimonial-body" style={{animationDelay:"0.75s"}} id="section2">
                    <p>"This is another testimonial. This will probably contain
                        information such as how good his work was and stuff like that.
                        Blah blah blah blah blahhhhhhhhhhhhhhhhh."
                        <span class="testimonial-signature">- Some random dude &sdot; Somwhere, Anywhere</span>
                    </p>
                    <Gallery images={doug_and_sue_images} // will change
                             backdropClosesModal={true}
                             enableKeyboardInput={true}
                             enableImageSelection={false}/> 
                </section>
                <section className="testimonial-body" style={{animationDelay:"1.5s"}} id="section3">
                    <p>"This is another testimonial. This will probably contain
                        information such as how good his work was and stuff like that.
                        Blah blah blah blah blahhhhhhhhhhhhhhhhh."
                        <span class="testimonial-signature">- Some random dude &sdot; Somwhere, Anywhere</span>
                    </p>
                    <Gallery images={doug_and_sue_images} // will change
                             backdropClosesModal={true}
                             enableKeyboardInput={true}
                             enableImageSelection={false}/> 
                </section>
                <section className="testimonial-body" style={{animationDelay:"2.25s"}} id="section4">
                    <p>"This is another testimonial. This will probably contain
                        information such as how good his work was and stuff like that.
                        Blah blah blah blah blahhhhhhhhhhhhhhhhh."
                        <span class="testimonial-signature">- Some random dude &sdot; Somwhere, Anywhere</span>
                    </p>
                    <Gallery images={doug_and_sue_images} // will change
                             backdropClosesModal={true}
                             enableKeyboardInput={true}
                             enableImageSelection={false}/> 
                </section>
            </div>
        );
    }
}

export default Testimonials;