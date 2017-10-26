import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import SectionTile from './SectionTile/SectionTile';
import { connect } from 'react-redux';
import { getUser, getSections, selectSection, getFavorites } from '../../../ducks/reducer';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getUser().then(user => this.props.getFavorites(user.value.id))
        this.props.getSections();
    }
    render() {
        // console.log(this.props.user)
        let { first_name, username } = this.props.user || ``
        let name = first_name || ``
        name ? name = username : name = ``;
        return (
            <div className='Home'>
                <div className='title-box' >
                    <div className='content-wrapper' >
                        {`Welcome${name ? ` ${name}` : ``}!`.split(``).map((letter, i) => {
                            return (
                                <p className='welcome-letter' style={letter == ` ` ? { color: 'rgba(0,0,0,0)' } : {}} >
                                    {letter == ` ` ? `.` : letter}
                                </p>
                            )
                        })}
                    </div>
                </div>
                <div className='subtitle-box'>
                    Please select a section
                </div>
                <div className='post-box'>
                    {
                        this.props.sections.length ?
                            this.props.sections.map((item, i) => {
                                {/* console.log(item); */ }
                                return (
                                    <SectionTile key={i} url={`/section/${item.section || ``}`} title={item.section} key={i} function={this.props.selectSection} />
                                );
                            })
                            :
                            null
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
    selectSection,
    getFavorites
}

export default connect(mapStateToProps, outActions)(Home);
