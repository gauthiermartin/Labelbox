import * as React from 'react';
import ClassificationForm, { Label } from './classification-options';
import Icon from 'material-ui/Icon';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  max-height: 80vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

const ImageFrame = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #dddddd;
  width: 100%;
`;

interface Props {
  imageUrl?: string;
  label?: Label;
  onSkip: Function;
  onSubmit: Function;
  onLabelUpdate: Function;
  onImageLoad: Function,
  onErrorLoadingImage: Function,
  loading: boolean;
  errorLoadingImage: boolean;
}

// TODO make this a function
export class LabelingScreen extends React.Component {
  public props: Props;

  render() {
    if (!this.props.imageUrl) {
      return (<div>Loading...</div>);
    }

    return (
      <Content>
        <ClassificationForm
          label={this.props.label || {}}
          loading={this.props.loading}
          onLabelUpdate={(label: Label) => this.props.onLabelUpdate(label)}
          onSubmit={() => this.props.onSubmit()}
          onSkip={() => this.props.onSkip()}
        />
        <MainContent>
          <ImageFrame>
            {
              this.props.imageUrl && !this.props.errorLoadingImage &&
                (<img style={{maxWidth: '100%', objectFit: 'scale-down', maxHeight: '100%', opacity: this.props.loading ? '0.2' : '1'} as any}
                    src={this.props.imageUrl}
                    onLoad={() => this.props.onImageLoad()}
                    onError={() => this.props.onErrorLoadingImage()}
                    alt="classify-data"
                  />)
            }
          </ImageFrame>
          {
            this.props.errorLoadingImage && (
              <div style={{display: 'flex', flexGrow: '1', flexDirection: 'column', alignItems: 'center'} as any}>
                <Icon style={{color: 'grey', fontSize: '200px'}}>broken_image</Icon>
                <div style={{color: 'grey', fontStyle: 'italic'}}>
                  Error loading <a href={this.props.imageUrl} target="_blank">{this.props.imageUrl}</a>. Please confirm that this url is live and a direct link to an image. Webpage links are not supported.
                </div>
              </div>
            )
          }
        </MainContent>
      </Content>
    );
  }
}
