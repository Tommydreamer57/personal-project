import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { SectionTile } from '../../reusable/PostTile/PostTile';
import { connect } from 'react-redux';
import { getUser, getSections, selectSection } from '../../../ducks/reducer';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getUser();
        this.props.getSections();
    }
    render() {
        // console.log(this.props.user)
        let name = this.props.user.first_name || this.props.user.username;
        return (
            <div className='Home'>
                <div className='title-box' >
                    Welcome{name ? ` ${name}` : ``}!
                </div>
                <div className='subtitle-box'>
                    Please select a section
                </div>
                <div className='post-box'>
                    {
                        this.props.sections.map((item, i) => {
                            console.log(item);
                            return (
                                <SectionTile url={`/section/${item.section || ``}`} title={item.section} key={i} function={this.props.selectSection} />
                            );
                        })
                    }
                </div>
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        user: state.user,
        sections: state.sections
    }
}

const outActions = {
    getUser,
    getSections,
    selectSection
}

export default connect(mapStateToProps, outActions)(Home);
