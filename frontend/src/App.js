import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            tag_names: {},
            show_tag_detail_of: 1,
        }

        this.fetchImages = this.fetchImages.bind(this)             // get image list
        this.deleteTag = this.deleteTag.bind(this)                 // delete tag with tag id
        this.addTag = this.addTag.bind(this)                       // add tag name with image id
        this.handleTagChange = this.handleTagChange.bind(this)     // tag_names
        this.changeTagDetailId = this.changeTagDetailId.bind(this) // show_tag_detail_of
    };

    componentWillMount() {
        this.fetchImages()
    }

    fetchImages() {
        console.log('Fetching...')

        fetch('http://127.0.0.1:8000/api/image-list/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    images: data
                })
            )
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    deleteTag(tag) {
        var csrftoken = this.getCookie('csrftoken')

        fetch(`http://127.0.0.1:8000/api/tag-delete/${tag.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        }).then((response) => {
            this.fetchImages()
        })
    }

    handleTagChange(e, image_obj) {
        e.preventDefault()
        
        var image_id = image_obj.image_id;
        var new_tag_name = e.target.value;

        this.state.tag_names[image_id] = new_tag_name;
    }

    changeTagDetailId(e, image_obj) {
        console.log("Clicked");
        var image_id = image_obj.image_id;
        this.state.show_tag_detail_of = image_id;
        this.fetchImages()
    }
 
    addTag(e, image_obj) {
        e.preventDefault();

        var image_id = image_obj.image_id;
        var csrftoken = this.getCookie('csrftoken')
        var url = `http://127.0.0.1:8000/api/image-tag-add/${image_id}/`;

        var data = {
            tag_name : this.state.tag_names[image_id]
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data)
        }).then((response) => {
            this.fetchImages()
            var tag_inputs = document.getElementsByClassName("tag_input_elements");
            for (var i=0; i<tag_inputs.length; i++) {
                tag_inputs[i].value = "";
            }
        }).catch(function(error) {
            console.log('ERROR:', error)
        })

    }


// show_tag_detail_of - it will decide which image-container will have tag-container


// mai-div
//     image-container
//         image-div
//             img
//         tag-container
//             tag-add-div
//                 form
//                     form-div
//                         input-div
//                         submit-button-div
//             tag-list-div
//                 div
//                     tag-name-div
//                     tag-delete-div
//     image-container
//         image-div
//             img

//     image-container
//         image-div
//             img


    render() {
        var images = this.state.images;
        var self = this;
        
        return (
            <div className="container">
                {images.map(function(image_obj, index){
                    return(
                        <div key={index} className="task-wrapper flex-wrapper" onClick={(e) => self.changeTagDetailId(e, image_obj)} >

                            <div className="ImageDiv" style={{flex: 6}}>
                                <img src={image_obj.img} style={{width: '800px' , height: '500px'}} />
                            </div>

                            { image_obj.image_id == self.state.show_tag_detail_of &&
                                ( 
                                    <div>
                                        <div >
                                            <form onSubmit={(e) => self.addTag(e, image_obj)}  id="form">
                                                <div className="flex-wrapper">
                                                    <div style={{flex: 6}}>
                                                        <input onChange={(e) => self.handleTagChange(e, image_obj)} className="form-control tag_input_elements" type="text" name="tag_name" placeholder="Tag Name" />
                                                    </div>

                                                    <div style={{flex: 1}}>
                                                        <input className="btn btn-warning submit" type="submit" name="Add" value="Add Tag" />  
                                                     </div>
                                                </div>
                                            </form> 
                                        </div>
                                        <div className="TagDiv">
                                           {image_obj.tag_list.map(function(tag_obj, index){
                                                return (
                                                    <div className="list-wrapper">
                                                        <div style={{flex:7}}>
                                                            <span>{tag_obj.tag_name}</span>
                                                        </div>

                                                        <div style={{flex:1}}>
                                                            <button onClick={() => self.deleteTag(tag_obj)} className="btn btn-sm btn-outline-dark delete">-</button>
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                       </div>
                                    </div>
                                ) 
                            }

                        </div>
                    )
                })}   

            </div>
        )
    }
}

export default App;
