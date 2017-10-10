import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { FavoriteButton } from '../../reusable/Buttons/Button';
import './Post.css';

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section: 'Section Title',
            title: 'Title',
            subtitle: 'This is the subtitle',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac porttitor quam, hendrerit sodales nibh. Suspendisse dapibus ligula a lobortis mattis. Suspendisse scelerisque tempus justo ut volutpat. Curabitur ultrices, odio et molestie convallis, metus urna vehicula turpis, sed mollis lacus sapien sed nulla. Aenean vel urna lectus. Sed lorem ex, varius a luctus sed, posuere et diam. Donec vel iaculis enim. Vivamus tincidunt rutrum lacus eu porta. Nam odio ante, maximus sit amet suscipit in, iaculis in neque. Sed quis efficitur quam. Nulla in ipsum ullamcorper, blandit est sodales, pellentesque nulla. Nam vitae lorem tempus, pharetra mi sed, porta metus. Integer ultrices semper neque ut eleifend.<br/> Nunc ullamcorper augue ut sapien varius rhoncus. Pellentesque porttitor luctus enim quis congue. Morbi rhoncus turpis vel ligula lacinia sollicitudin.Duis nec mauris in lorem ullamcorper commodo quis ac ipsum. Nulla id turpis in urna efficitur interdum.Vivamus massa libero, mollis id euismod id, ullamcorper sed lorem. Mauris mi mauris, mollis ut mi vel, egestas molestie neque. Etiam ac augue in massa egestas sodales.Donec et lorem sit amet urna mattis lacinia sit amet eu ipsum. Sed fermentum sodales dapibus. Praesent convallis lacus sit amet congue maximus.Donec nisi dui, ullamcorper sit amet nisl eu, euismod mattis tellus. Sed volutpat commodo elit, quis imperdiet purus auctor sed.<br />Aliquam gravida dolor in leo dapibus vehicula.Aliquam scelerisque massa eget elit sollicitudin vestibulum.Donec id hendrerit orci. Ut nibh mauris, lacinia vitae faucibus at, malesuada a augue. Morbi vulputate consectetur varius. Sed sodales auctor elit. Cras vehicula, diam vulputate tempus fringilla, nisl neque fringilla eros, at commodo arcu lorem ac ligula.Nullam cursus risus diam, sed egestas nunc interdum a. Nullam quis odio eleifend, maximus leo dictum, bibendum urna.Praesent quis pellentesque velit, eu feugiat augue. Suspendisse ut justo magna. Cras a tellus a libero suscipit accumsan.Proin non dolor nec nisi lobortis semper ac vitae magna. Phasellus vulputate, felis ut ullamcorper rutrum, mauris mi pellentesque dolor, in tincidunt odio enim vitae erat.Vestibulum eget pretium purus, id cursus felis.',
            fav: false
        }
        this.toggleFav = this.toggleFav.bind(this);
    }
    toggleFav() {
        this.setState({
            fav: !this.state.fav
        })
    }
    render() {
        return (
            <div className='Post'>
                <div className='title-box'>
                    {this.state.section}
                </div>
                <div className='text-box'>
                    <FavoriteButton onClick={() => this.toggleFav()} fav={this.state.fav} />
                    <div className='title'>
                        {this.state.title}
                    </div>
                    <div className='subtitle'>
                        {this.state.subtitle}
                    </div>
                    {this.state.body}
                </div>
                <Navbar />                
            </div>
        )
    }
}