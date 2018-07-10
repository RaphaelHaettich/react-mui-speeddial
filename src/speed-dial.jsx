import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { FabSpinner } from './fab-spinner';
import createReactClass from 'create-react-class'

const styles = {

  container: {
    position: "relative",
    display: "inline-block"
  }

};


export const SpeedDial = createReactClass({

  getInitialState() {
    return {
      internalOpen: false
    }
  },


  handleFabClick() {
    this.setState({
      internalOpen: !this.state.internalOpen
    });

    let cb = this.props.onOpenCloseRequest;
    cb && cb();
  },


  handleCloseRequest() {
    this.handleFabClick();
  },

  render: function() {

    let { open, effect, style } = this.props;

    if (open === undefined)
      open = this.state.internalOpen;

    if (effect === undefined)
      effect = "fade-staggered";

    let enhancedChildren = React.Children.map(this.props.children,
      (child, index) => React.cloneElement(child, {
        ...child.props,
        effect,
        index,
        visible: open,
        itemPosition: this.props.itemsPosition,
        onCloseRequest: this.handleCloseRequest
      })
    );

    return <div className="speed-dial" style={{...styles.container, ...style}}>

      <FloatingActionButton
        {...this.props.fabProps}
        onClick={this.handleFabClick}
      >
        <FabSpinner
          aContent={this.props.fabContentOpen}
          bContent={this.props.fabContentClose || this.props.fabContentOpen}
          showB={open}
        />
      </FloatingActionButton>

      {enhancedChildren}

    </div>;
  }

});

SpeedDial.defaultProps = {
  itemsPosition: 'above' // above or below
};
