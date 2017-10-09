import React, { Component } from 'react'
import styles from './postitem.css';

export default class PostItem extends Component {

   constructor(props) {
   	  super(props)
   	  this.state={expanded: this.props.expanded, itemId: this.props.itemId, title: this.props.title}
   	  this.handleClick = this.handleClick.bind(this)
   }
   expand(){
   	  this.setState({ expanded:true })
   }
   collapse() {
   	  this.setState( { expanded:false })
   }
   toggleExpansion() {
   	  this.setState({ expanded: !this.state.expanded })
   }
   handleClick() {
   	  this.toggleExpansion()
   }
   handleKeyPress(event) {
   	var key = event.keyCode;
			console.log(event);
				
			// Enter
			if (key === 13) {
					this.toggleExpansion(); 
			}
				
			// Esc
			if (key === 27) {
					this.collapse();
			}
   }
   render() {
   	            var classes = "accordion " + this.props.theme;
				var expandState = this.state.expanded ? 'is-expanded' : 'is-collapsed',
				hiddenState = this.state.expanded ? '' : 'hidden',
				hiddenClass = this.state.expanded ? 'visually-hidden' : 'visually-hiddenz',
				ariaHiddenState = this.state.expanded ? 'false' : 'true',
				ariaExpandedState = this.state.expanded ? 'true' : 'false',
				tabState = this.state.expanded ? '0' : '-1',
				classes = "accordion-item " + expandState,
				selectedState = this.state.expanded ? 'true' : 'false',
				uniqueId = this.state.itemId,
				title = this.state.title;
   	  return (

			<div id={uniqueId} className={classes}>
					<header onClick={this.handleClick} onKeyDown={this.handleKeyPress} tabIndex="0" role="tab" aria-selected={selectedState} aria-controls={uniqueId} aria-expanded={ariaExpandedState}>
						<span>{title}</span>
					</header>
					<section id={uniqueId} aria-hidden={ariaHiddenState} onKeyDown={this.handleKeyPress}>
							<h2>Content</h2> 
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim inventore velit sint quod blanditiis, sapiente voluptatibus, molestiae, dolore ipsam labore quaerat veritatis fuga libero! Explicabo aperiam sapiente optio consectetur placeat.
					</section>
			</div>
   	  )
   }
}