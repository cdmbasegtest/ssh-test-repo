import { injectGlobal } from 'styled-components'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
    .rc-collapse {
      background-color: #f7f7f7;
      border-radius: 3px;
      border: 1px solid #d9d9d9;
    }

    .rc-collapse-anim-active {
      transition: height 0.2s ease-out;
    }

    .rc-collapse-item {
      border-top: 1px solid #d9d9d9;
    }

    .rc-collapse-item:first-child {
      border-top: none;
    }

    .rc-collapse-header {
      height: 38px;
      line-height: 38px;
      text-indent: 16px;
      color: #666;
      cursor: pointer;
    }

    .rc-collapse-header .arrow {
      display: inline-block;
      content: '\\20';
      width: 0;
      height: 0;
      font-size: 0;
      line-height: 0;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-left: 4px solid #666;
      vertical-align: middle;
      margin-right: 8px;
    }

    .rc-collapse-item-disabled > .rc-collapse-header {
      cursor: not-allowed;
      color: #999;
      background-color: #f3f3f3;
    }

    .rc-collapse-content {
      overflow: hidden;
      color: #666;
      padding: 0 16px;
      background-color: #fff;
    }

    .rc-collapse-content-box {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .rc-collapse-content-inactive {
      display: none;
    }

    .rc-collapse-item:last-child > .rc-collapse-content {
      border-radius: 0 0 3px 3px;
    }

    .rc-collapse-item-active > .rc-collapse-header .arrow {
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 4px solid #666;
      margin-right: 6px;
    }

    .rc-checkbox {
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      position: relative;
      line-height: 1;
      vertical-align: middle;
    }

    .rc-checkbox-disabled {
      cursor: not-allowed;
    }
    .rc-checkbox:hover .rc-checkbox-inner,
    .rc-checkbox-input:focus + .rc-checkbox-inner {
      border-color: #a2a0a0;
    }
    .rc-checkbox-inner {
      position: relative;
      top: 0;
      left: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      border-width: 2px;
      border-style: solid;
      border-radius: 0;
      border-color: #d8d8d8;
      background-color: #ffffff;
      transition: border-color 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), background-color 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    .rc-checkbox-inner:after {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      left: 4px;
      top: -1px;
      display: table;
      width: 8px;
      height: 14px;
      border: 2px solid #ffffff;
      border-top: 0;
      border-left: 0;
      content: ' ';
      animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
      animation-duration: 0.3s;
      animation-name: amCheckboxOut;
    }
    .rc-checkbox-input {
      position: absolute;
      left: 0;
      z-index: 9999;
      cursor: pointer;
      opacity: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
    }
    
    .rc-checkbox-checked:hover .rc-checkbox-inner {
      border-color: #a2a0a0;
    }
    .rc-checkbox-checked .rc-checkbox-inner {
      border-color: #a2a0a0;
      background-color: #fff;
    }
    .rc-checkbox-checked .rc-checkbox-inner:after {
      transform: rotate(45deg);
      position: absolute;
      left: 4px;
      top: -1px;
      display: table;
      width: 8px;
      height: 14px;
      border: 2px solid #a2a0a0;
      border-top: 0;
      border-left: 0;
      content: ' ';
      animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
      animation-duration: 0.3s;
      animation-name: amCheckboxOut;
    }
    .rc-checkbox-disabled.rc-checkbox-checked:hover .rc-checkbox-inner {
      cursor: not-allowed;
      border-color: #d9d9d9;
    }
    .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner {
      cursor: not-allowed;
      background-color: #f3f3f3;
      border-color: #d9d9d9;
    }
    .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner:after {
      cursor: not-allowed;
      animation-name: none;
      border-color: #cccccc;
    }
    .rc-checkbox-disabled:hover .rc-checkbox-inner {
      cursor: not-allowed;
      border-color: #d9d9d9;
    }
    .rc-checkbox-disabled .rc-checkbox-inner {
      cursor: not-allowed;
      border-color: #d9d9d9;
      background-color: #f3f3f3;
    }
    .rc-checkbox-disabled .rc-checkbox-inner:after {
      cursor: not-allowed;
      animation-name: none;
      border-color: #f3f3f3;
    }
    .rc-checkbox-disabled .rc-checkbox-inner-input {
      cursor: not-allowed;
    }
    
    .rc-checkbox-disabled .rc-checkbox-input {
      cursor: not-allowed;
    }
    @-webkit-keyframes amCheckboxIn {
      0% {
        opacity: 0;
        transform-origin: 50% 50%;
        transform: scale(0, 0) rotate(45deg);
      }
      100% {
        opacity: 1;
        transform-origin: 50% 50%;
        transform: scale(1, 1) rotate(45deg);
      }
    }
    @keyframes amCheckboxIn {
      0% {
        opacity: 0;
        transform-origin: 50% 50%;
        transform: scale(0, 0) rotate(45deg);
      }
      100% {
        opacity: 1;
        transform-origin: 50% 50%;
        transform: scale(1, 1) rotate(45deg);
      }
    }
    @keyframes amCheckboxOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
`
