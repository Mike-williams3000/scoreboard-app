/**
* @title Templates
* @description To be described.
*
*
* @author GoMo
* @version 2.0 17/12/12
*/

var TEMPLATE_MANAGER =
{
	strObjID : "The HTML template fragement manager",
	strObjDescription : "This object is in charge of collecting and returning the HTML fragments required to build the course. If multiple fragments are found, the 3rd classname specified will be used to sub catergorize the elements",

	_strFragmentClassname : "templateFragmentC",

	_objCurrDOM : null,

	_objTemplateFragments : {},

	_strTemplateCollectionID : "codeTemplatesL",

	_strCollectionLog : "",

	collectTemplates : function (_objWhatDOM)
	{
		this._objCurrDOM = _objWhatDOM;

		this._strCollectionLog = "";

		if (this._parseDomForTemplates())
		{
			if (this._strCollectionLog != "")
			{
				// TO LOCALISE
				alert("ERROR: Duplicate template fragments found in TEMPLATE_MANAGER.handleEvent_templatePageLoaded(), templates.js\n\nDuplicate fragments:" + this._strCollectionLog)
				//LOCALE.alert('DUPLICATE_TEMPLATES_ERROR',  this._strCollectionLog);
			}
			this._objCurrDOM.getElementById(this._strTemplateCollectionID).innerHTML = "";
			EM.trigger("htmlTemplatesLoadedAndCollected");
		}
		else
		{
			if (this._emptyTemplateCollection())
			{
				LOCALE.alert('NO_TEMPLATES_FOUND_ERROR');
			}
		}
	},

	collectTemplatesFromFragment : function (_objWhatDOMLink)
	{
		this._strCollectionLog = "";

		if (this._parseDomForTemplates(_objWhatDOMLink))
		{
			if (this._strCollectionLog != "")
			{
				// TO LOCALISE
				alert("ERROR: Duplicate template fragments found in TEMPLATE_MANAGER.handleEvent_templatePageLoaded(), templates.js\n\nDuplicate fragments:" + this._strCollectionLog)
				//LOCALE.alert('DUPLICATE_TEMPLATES_ERROR',  this._strCollectionLog);
			}
		}
	},

	getTemplate : function (_strWhatTemplateName)
	{
		if (this._objTemplateFragments[_strWhatTemplateName])
		{
			return this._objTemplateFragments[_strWhatTemplateName]['generic'];
		}
		// TO LOCALISE
		alert("ERROR: Unknown template requested, template ref: " + _strWhatTemplateName + ". TEMPLATE_MANAGER.getTemplate(), templates.js");
		//LOCALE.alert('UNKOWN_TEMPLATE_REQUESTED_ERROR', _strWhatTemplateName);

		return false;
	},

	_parseDomForTemplates : function (_objWhatDOM)
	{
		if ((this._objCurrDOM) || (_objWhatDOM))
		{
			// If we've been passed a DOM then it's from a fragment file.
			if (_objWhatDOM)
			{
				var _arrTemplateFragments = CORE.getElementsByClassName(_objWhatDOM, this._strFragmentClassname);
			}
			else
			{
				var _arrTemplateFragments = CORE.getElementsByClassName(this._objCurrDOM, this._strFragmentClassname);
			}

			if (_arrTemplateFragments.length > 0)
			{
				var count =  0;
				while (count < _arrTemplateFragments.length)
				{
					this._addTemplateFragement(_arrTemplateFragments[count]);
					count++;
				}
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	},

	_addTemplateFragement : function (_domWhatTemplateFragment)
	{
		var _arrFragmentClasses = _domWhatTemplateFragment.className.split(" ");
		var _strFragmentID = _arrFragmentClasses[1];

		if (_arrFragmentClasses[2])
		{
			var _strSubType = _arrFragmentClasses[2];
		}
		else
		{
			var _strSubType = false;
		}

		var _htmFragmentData = _domWhatTemplateFragment.innerHTML;

		_htmFragmentData = this._replaceTemplateIDPrefixes(_htmFragmentData);

		if (!this._objTemplateFragments[_strFragmentID])
		{
			this._objTemplateFragments[_strFragmentID] = {};
		}

		if (!_strSubType)
		{
			if (this._objTemplateFragments[_strFragmentID]['generic'])
			{
				this._strCollectionLog += "\n\n* _strFragmentID: " + _strFragmentID + "\n  _strSubType:" + _strSubType;
			}
			this._objTemplateFragments[_strFragmentID]['generic'] = new TemplateFragment(_strFragmentID, _strSubType, _htmFragmentData, this._objCurrDOM);
			//this._objTemplateFragments[_strFragmentID]['generic'].htmData = LOCALISER.parseForLocalisableMarkup(this._objTemplateFragments[_strFragmentID]['generic'].htmData);
			this._objTemplateFragments[_strFragmentID]['generic'].htmData = this._objTemplateFragments[_strFragmentID]['generic'].htmData;
		}
		else
		{
			if (this._objTemplateFragments[_strFragmentID][_strSubType])
			{
				this._strCollectionLog += "\n\n* _strFragmentID: " + _strFragmentID + "\n  _strSubType:" + _strSubType;
			}
			this._objTemplateFragments[_strFragmentID][_strSubType] = new TemplateFragment(_strFragmentID, _strSubType, _htmFragmentData, this._objCurrDOM);
			//this._objTemplateFragments[_strFragmentID][_strSubType].htmData = LOCALISER.parseForLocalisableMarkup(this._objTemplateFragments[_strFragmentID][_strSubType].htmData);
			this._objTemplateFragments[_strFragmentID][_strSubType].htmData = this._objTemplateFragments[_strFragmentID][_strSubType].htmData;
		}
	},

	_emptyTemplateCollection : function ()
	{
		var _booFoundTemplate = false;
		for (var _strCurrTemplateKey in this._objTemplateFragments)
		{
			_booFoundTemplate = true;
			break;
		}
		return !_booFoundTemplate;
	},

	_replaceTemplateIDPrefixes : function(_htmFragmentData)
	{
		//YY_PREFIX_000_00_YY
		return _htmFragmentData.replace(/YY_PREFIX_\d{3}_\d{2}_YY/g, "");
	}
}

function TemplateFragment(_strFragmentID, _strSubType, _htmFragmentData, _objWhatDOM)
{
	this.strObjID = _strFragmentID;
	this.strSubType = _strSubType;
	this.htmData = _htmFragmentData;

	if (!_objWhatDOM)
	{
		this._objCurrDOM = document;
	}
	else
	{
		this._objCurrDOM = _objWhatDOM;
	}

	this._preprocessFragment();
}

TemplateFragment.prototype =
{
	_preprocessFragment: function()
	{
		// Replaces the faked tag markup with proper tags.
		this.htmData = this.htmData.replace(/\[TAG\s([^\]]+)\]/g, "<$1>");

		// Replaces alt=XX_TEXT_XX with alt="XX_TEXT_XX"
		this.htmData = this.htmData.replace(/<[^>]+\s[^>]+>/g, function(_strMatch){ return _strMatch.replace(/([\w-]+=)([\w-]+)/g, "$1\"$2\""); });

		// Corrects IE8 disabled to disabled="disabled"
		if (this.htmData.indexOf(" disabled ") > -1)
		{
			this.htmData = this.htmData.replace(/ disabled /g, ' disabled="disabled" ');
		}

		// Corrects IE8 CHECKED to checked="checked"
		this.htmData = this.htmData.replace(/ CHECKED /g, ' checked="checked" ');

		//this.htmData = LOCALE.parseForTranslatableEntities(this.htmData);

		// Adds the onerror handler to images
		//this.htmData = this.htmData.replace(/<img/g, "<img onerror=\"EM.trigger('imageLoadFailure', this)\"");
	},

	getContentAsDOMNodes : function (_booOmitTextNodes)
	{
		var _domContainer = this._objCurrDOM.createElement("div");
		_domContainer.innerHTML = this.htmData;
		var _arrChildNodes = [];
		while (_domContainer.childNodes.length > 0)
		{
			var _domCurrChild = _domContainer.removeChild(_domContainer.childNodes[_domContainer.childNodes.length - 1]);
			if ((!_booOmitTextNodes) || (_booOmitTextNodes && (_domCurrChild.nodeType != 3)))
			{
				_arrChildNodes.push(_domCurrChild);
			}
		}

		return _arrChildNodes;
	}
}

EM.register(TEMPLATE_MANAGER)