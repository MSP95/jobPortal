import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

export default class ApplyLater extends React.Component {
  render(){
    return (
      <div className="container-fluid organizer-padding">
        <Card>
          <CardHeader
            title="Quilt2"
            subtitle="Java Developer"
            actAsExpander={true}
            showExpandableButton={true}
            avatar="http://github-jobs.s3.amazonaws.com/55aa15ba-3381-11e8-8aa5-cd3357a09495.png"
            >
            </CardHeader>
            <CardText expandable={true}>
              <div className="organizer-padding">Date Applied</div>
              <div className="organizer-padding">Position</div>
            </CardText>
          </Card>
        </div>
      );
    }
  }