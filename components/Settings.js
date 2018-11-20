import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import SettingsIcon from './svg/Settings'
import ThemeSelect from './ThemeSelect'
import FontSelect from './FontSelect'
import Slider from './Slider'
import Toggle from './Toggle'
import WindowPointer from './WindowPointer'
import Collapse from './Collapse'

import { COLORS } from '../lib/constants'
import { toggle, formatCode } from '../lib/util'

class Settings extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
    this.toggle = this.toggle.bind(this)
    this.format = this.format.bind(this)
  }

  toggle() {
    this.setState(toggle('isVisible'))
  }

  handleClickOutside() {
    this.setState({ isVisible: false })
  }

  format() {
    return formatCode(this.props.code)
      .then(this.props.onChange.bind(this, 'code'))
      .catch(() => {
        // create toast here in the future
      })
  }

  render() {
    return (
      <div className="settings-container">
        <div
          className={`settings-display ${this.state.isVisible ? 'is-visible' : ''}`}
          onClick={this.toggle}
        >
          <SettingsIcon />
        </div>
        <div className="settings-settings">
          <WindowPointer fromLeft="15px" />
          <ThemeSelect
            selected={this.props.windowTheme || 'none'}
            onChange={this.props.onChange.bind(null, 'windowTheme')}
          />
          <FontSelect
            selected={this.props.fontFamily || 'Hack'}
            onChange={this.props.onChange.bind(null, 'fontFamily')}
          />
          <Slider
            label="Font size"
            value={this.props.fontSize || 13}
            minValue={10}
            maxValue={18}
            step={0.5}
            onChange={this.props.onChange.bind(null, 'fontSize')}
          />
          <Toggle
            label="Window controls"
            enabled={this.props.windowControls}
            onChange={this.props.onChange.bind(null, 'windowControls')}
          />
          <Toggle
            label="Line numbers"
            enabled={this.props.lineNumbers}
            onChange={this.props.onChange.bind(null, 'lineNumbers')}
          />
          <Toggle
            label="Auto-adjust width"
            enabled={this.props.widthAdjustment}
            onChange={this.props.onChange.bind(null, 'widthAdjustment')}
          />
          <Collapse label="Advanced">
            <Slider
              label="Line height"
              value={this.props.lineHeight}
              minValue={90}
              maxValue={250}
              usePercentage={true}
              onChange={this.props.onChange.bind(null, 'lineHeight')}
            />
            <Slider
              label="Padding (vertical)"
              value={this.props.paddingVertical || 16}
              maxValue={200}
              onChange={this.props.onChange.bind(null, 'paddingVertical')}
            />
            <Slider
              label="Padding (horizontal)"
              value={this.props.paddingHorizontal || 32}
              onChange={this.props.onChange.bind(null, 'paddingHorizontal')}
            />
            <Toggle
              label="Drop shadow"
              enabled={this.props.dropShadow}
              onChange={this.props.onChange.bind(null, 'dropShadow')}
            />
            <Slider
              label="Drop shadow (offset-y)"
              value={this.props.dropShadowOffsetY || 20}
              onChange={this.props.onChange.bind(null, 'dropShadowOffsetY')}
            />
            <Slider
              label="Drop shadow (blur-radius)"
              value={this.props.dropShadowBlurRadius || 68}
              onChange={this.props.onChange.bind(null, 'dropShadowBlurRadius')}
            />
            <Toggle
              label="Squared image"
              enabled={this.props.squaredImage}
              onChange={this.props.onChange.bind(null, 'squaredImage')}
            />
            <Toggle
              label="Watermark"
              enabled={this.props.watermark}
              onChange={this.props.onChange.bind(null, 'watermark')}
            />
            <Toggle label="Prettify code" center={true} enabled={false} onChange={this.format} />
            <Toggle
              label={<center className="red">Reset settings</center>}
              center={true}
              enabled={false}
              onChange={this.props.resetDefaultSettings}
            />
          </Collapse>
        </div>
        <style jsx>
          {`
            .settings-container {
              display: flex;
              position: relative;
              height: 100%;
              width: 37px;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
              color: #fff;
              font-size: 12px;
            }

            .settings-display {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid ${COLORS.SECONDARY};
              border-radius: 3px;
              user-select: none;
              position: relative;
              z-index: 1;
              cursor: pointer;
            }

            .settings-display:hover {
              background: ${COLORS.HOVER};
            }

            .is-visible + .settings-settings {
              display: block;
            }

            .settings-settings {
              display: none;
              position: absolute;
              top: 52px;
              left: 0;
              border: 1px solid ${COLORS.SECONDARY};
              width: 184px;
              border-radius: 3px;
              background: ${COLORS.BLACK};
            }

            .settings-settings > :global(div) {
              border-bottom: solid 1px ${COLORS.SECONDARY};
            }

            .settings-settings > :global(div):first-child,
            .settings-settings > :global(div):last-child,
            .settings-settings > :global(.collapse) {
              border-bottom: none;
            }

            .red {
              color: red;
            }
          `}
        </style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Settings)
