// Import Usestate and useffect from wordpress
import { useState, useEffect } from '@wordpress/element';

// Import Wordpress Block Editors
import {
    InspectorControls,
} from '@wordpress/block-editor';

// Import Wordpress Components
import { TextControl,PanelBody, RadioControl, ColorPicker, __experimentalNumberControl as NumberControl} from '@wordpress/components';
//import {FontSize} from '@wordpress/element';
//Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const fallbackFontSize = 16;


registerBlockType( 'cgb/block-button-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'button-block - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'button-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
        buttonText: {
            type: 'string',
            default: 'provide-text' // empty default
        },
		fontSize:{
			type:'Number'
		},
		link: {
            type: 'string'            
        },
		backgroundColor: {
            type: 'string',
            default: '#f1f2f2' // empty default
        },
		btnBorderRadius: {
            type: 'integer',
			default: 15
        },
		target: {
            type: 'string'
        },
		padding: {
            type: 'integer',
			default: 35
        },
		margin:{
			type: 'integer',
			default: 15
		}
    },
	edit: ( props ) => {
		
		const [ buttonText, setButtonText ] = useState( props.attributes.buttonText );
		const [ btnfontSize, setFontSize ] = useState(props.attributes.fontSize);
		const [ linktag, setLink ] = useState( props.attributes.link );
		const [ targetlink, setTarget ] = useState( props.attributes.target );
		const [ backgroundColor, setBackgroundColor ] = useState( props.attributes.backgroundColor );
		const [ btnBorderRadius, setBtnBorderRadius ] = useState( props.attributes.btnBorderRadius );
		const [ padding, setPadding ] = useState( props.attributes.padding );
		const [margin,setMargin] = useState (props.attributes.margin);

		useEffect(() => {			
			props.setAttributes( { 'buttonText': buttonText } );
			props.setAttributes({'fontSize': btnfontSize});
			props.setAttributes( { 'link': linktag } );
			props.setAttributes( { 'target': targetlink } );
			props.setAttributes( { 'backgroundColor': backgroundColor } );
			props.setAttributes( { 'borderRadius': btnBorderRadius } );
			props.setAttributes( { 'padding': padding } );
			props.setAttributes ({'margin':margin});
		}, [ buttonText,btnfontSize, linktag, targetlink, backgroundColor, btnBorderRadius, padding, margin ] )

		return (
            <div style={{fontSize:btnfontSize+'px',backgroundColor: backgroundColor, borderRadius: btnBorderRadius+"px", padding: padding+"px",margin:margin+"px" }} className="Mybutton">

				<InspectorControls>

					<TextControl
						label="Write  Button Text"
						value={ buttonText }
						onChange={ ( value ) => setButtonText( value ) }
						placeholder='Write  Button Text'
					/>
					<NumberControl
					    label="Use font size"
					    value = {btnfontSize}
					    isShiftStepEnabled={ true }
					    onChange = {(value)=>setFontSize(value)}
					    shiftStep={ 10 }
						defaultValue="25"
					/>
                    <TextControl
						label="Write Link Here"
						value={ linktag }
						onChange={ ( value ) => setLink( value ) }
						placeholder="Write Link Here"
					/>

                    <RadioControl
						label="Use Target"
						selected={ targetlink }
						options={ [
							{ label: 'Open in same page', value: '_self' },
							{ label: 'Open in same window new page', value: '_blank' },
							{ label: 'Open in new window', value: '_top' }
						] }
						onChange={ ( value ) => setTarget( value ) }
					/>
					<ColorPicker
						label="Use Background Color"
						value={backgroundColor}
						onChange={(value=>setBackgroundColor(value))
						}
						defaultValue="#000"
						/>
					<NumberControl
						label="Set Border Radius"
						isShiftStepEnabled={ true }
						onChange={ (value) => setBtnBorderRadius(value)}
						shiftStep={ 10 }
						value={ btnBorderRadius }
						placeholder="Set Border Radius"
					/>
                <PanelBody title={ __( 'Selector' ) }>
				
					<NumberControl
						label="Set Padding"
						isShiftStepEnabled={ true }
						onChange={ (value) => setPadding(value)}
						shiftStep={ 10 }
						value={ padding }
						placeholder="Set Padding"
					/>
					<NumberControl
						label="Set Margin"
						isShiftStepEnabled={ true }
						onChange={ (value) => setMargin(value)}
						shiftStep={ 10 }
						value={ margin }
						placeholder="Set Margin"
					/>
					
					</PanelBody>	
				</InspectorControls>
					
				<a href={linktag} target = {targetlink}>
					{buttonText}
				</a>
				
			</div>
		);
	},

 

	save: ( props ) => {
		console.log(props);
		
		return (
			<div style={{fontSize:props.attributes.btnfontSize, backgroundColor: props.attributes.backgroundColor, borderRadius: props.attributes.btnBorderRadius+"px", padding: props.attributes.padding+"px" , margin : props.attributes.margin}} className="Mybutton" >

				<a href={props.attributes.link} target={props.attributes.target}>
					{props.attributes.buttonText}
				</a>

			</div>
		);
	},
} );