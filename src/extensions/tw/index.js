const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

// eslint-disable-next-line max-len
const iconURI = `data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS4zMSIgaGVpZ2h0PSI4Mi4yNCIgdmlld0JveD0iMCwwLDc5LjMxLDgyLjI0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjM0NSwtMTM4LjkyMjAxKSI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yNzcuNjU1LDE1NC41OTIwMWMwLDIuOTMgLTEuMDUsNS43IC0yLjk2LDcuOTFjLTEuNzEsMi4wOSAtMy45LDMuNjkgLTYuNCw0LjcyYzAuMDUsMi4yNyAwLjEyLDUuMDQgMC4yMSw4LjI2djQuODNjMC4yNyw2LjMxIDAuMzksOC44MyAwLjQ0LDkuODNjMC4wNSwwLjM4IDAuMDgsMC43NyAwLjA5LDEuMTdjMC4wNiwzLjA3IC0wLjAzLDcuNDYgLTAuMjcsMTMuNDNjLTAuMDIsMC40NiAtMC4wNywwLjkyIC0wLjE1LDEuMzdjLTAuNDMsMi41NyAtMS42LDUuMDcgLTMuNDgsNy40MmMtMi40OSwzLjEgLTUuOTIsNS4wNyAtOS42OCw1LjU0Yy0wLjQ2LDAuMDYgLTAuOTIsMC4wOSAtMS4zOCwwLjA5Yy0yLjE3LDAgLTMuNjcsLTAuNTYgLTYuMTUsLTEuNDljLTMuMDQsLTEuMTQgLTUuNCwtMy41NiAtNi40OSwtNi41OGMtMi40OCwwLjkzIC01LjA1LDEuMyAtNy42MiwxLjA5Yy0xLjIyLC0wLjA2IC0zLjAyLDAuMDMgLTUuMzEsMC4yNWMtMC4zNCwwLjA0IC0xLjQsMC4yIC0zLjc5LDAuNzNjLTAuMTIsMC4wMyAtMC4yNCwwLjA1IC0wLjM2LDAuMDdjLTIuNDYsMC40NyAtNC44NCwwLjY1IC03LDAuNTZjLTAuMTYsLTAuMDEgLTAuMzMsLTAuMDIgLTAuNDksLTAuMDRjLTYuOTYsLTAuNjEgLTEzLjk5LC01LjMzIC0xMy45OSwtMTQuNDdjMCwtMS41NCAwLjI1LC0zLjA2IDAuNzQsLTQuNTRjMC4zMSwtMC45MSAwLjczLC0xLjc3IDEuMjYsLTIuNThjMS4yNiwtMS45MiAzLjgxLC00Ljc4IDguMjksLTYuMnYtMS43MmMwLC0wLjgxIDAuMDksLTEuNjIgMC4yNywtMi40bC0wLjE2LC0yLjY5YzAsLTAuMDcgLTAuMDEsLTAuMTQgLTAuMDEsLTAuMjJjLTAuMDUsLTEuMjIgLTAuMTMsLTIuMzEgLTAuMjYsLTMuMjRjLTAuMDQsLTAuMjkgLTAuMDcsLTAuNTggLTAuMDgsLTAuODdjLTAuMDQsLTAuNTcgLTAuMDcsLTEuMTkgLTAuMTEsLTEuODdjLTYuMjQsLTEuNTggLTEwLjQ3LC03LjAxIC0xMC40NywtMTQuMDVjMCwtMy4zIDEuMzUsLTYuMzMgNCwtOC45OWMyLjA1LC0yLjA3IDQuMzYsLTMuMzcgNi44NiwtMy44OWMxLjgsLTAuMzggMy44MywtMC40NyA3LjEsLTAuMzJjMC4zMywwIDAuOTksLTAuMDMgMi4xOSwtMC4xYzEuNjUsLTAuMTEgMi44LC0wLjE2IDMuNjQsLTAuMTZjMi45NSwwIDUuMzgsMS4xMSA3LjEzLDIuMTNjMi42LC0zLjA1IDYuMSwtNC45NCAxMC4xNSwtNS40N2MwLjI5LC0wLjAzIDAuNTcsLTAuMDYgMC44NiwtMC4wOGwzLjMzLC0wLjE3YzAuMTIsLTAuMDEgMC4yNCwtMC4wMSAwLjM2LC0wLjAxYzIuNjksLTAuMDYgNy4xNCwtMC4zNiAxMy4yNCwtMC45MmMzLjMzLC0wLjM2IDYuNjYsMC40NCA5LjczLDIuMzRjNC4yNywyLjYzIDYuNzIsNi43NiA2LjcyLDExLjMzeiIgZmlsbD0iIzNmMDlkMyIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTI2Ni4zMDIsMTU1LjM4NzAxYy0wLjkzOSwxLjIzMSAtMi4yODcsMS45MzYgLTQuMDQ3LDIuMTExYy0yLjg3NCwwLjE3NiAtNC41MTYsMC4zMjMgLTQuOTI2LDAuNDM5Yy0wLjA1OSwxLjIzMSAtMC4wODgsMy4xOTcgLTAuMDg4LDUuODk0YzAuMDI5LDIuNzU3IDAuMTE3LDYuNzQ0IDAuMjY0LDExLjk2M2MwLDEuMTE0IDAsMi42OTcgMCw0Ljc1YzAuMzUzLDguMzI3IDAuNTI4LDExLjk5MiAwLjUyOCwxMC45OTRjMC4wNTgsMi44MTUgLTAuMDMsNy4wNjcgLTAuMjY0LDEyLjc1NWMtMC4xMTgsMC43MDQgLTAuNTI4LDEuNDk1IC0xLjIzMSwyLjM3NWMtMC43MDQsMC44OCAtMS41MjYsMS4zNzcgLTIuNDYzLDEuNDk1Yy0wLjExOCwwIC0wLjg4LC0wLjI2NCAtMi4yODcsLTAuNzkxYy0wLjE3NiwtMC43NjIgLTAuNDExLC0xLjQwOCAtMC43MDQsLTEuOTM2Yy0xLjE3NCwtMS43NTkgLTIuNzU3LC00LjI1MSAtNC43NDksLTcuNDc3Yy0xLjI5MSwtMi41MjEgLTMuMzE0LC02LjMwMyAtNi4wNjksLTExLjM0OGMtMS45MzYsLTIuNjk2IC00LjgzOCwtNy4wMzYgLTguNzA4LC0xMy4wMThjLTAuNDExLC0wLjgyIC0xLjExNSwtMi4wNTIgLTIuMTExLC0zLjY5NGgtMC4xNzZjLTAuMTc2LDIuNTgxIC0wLjE0Nyw1LjE4OSAwLjA4OCw3LjgyOGMwLDAuMTE4IDAuMDQ0LDAuMzIzIDAuMTMyLDAuNjE2YzAuMDg4LDAuMjk0IDAuMTMyLDAuNTI3IDAuMTMyLDAuNzAzdjYuMDY5YzAsMi44MTUgLTAuMTE4LDUuMDQ0IC0wLjM1Miw2LjY4NmMwLjA1OSwwLjgyMSAwLjIwNywyLjAyMiAwLjQ0MywzLjYwNmMwLjgyNywwLjQ3IDEuODMyLDAuNzAzIDMuMDE1LDAuNzAzYzAuNDczLDAgMS4xMjIsLTAuMDU4IDEuOTUsLTAuMTc2YzAuODI3LC0wLjExNyAxLjQ0OCwtMC4xNzYgMS44NjIsLTAuMTc2YzEuNzE0LDAgMi45NTQsMC42MTUgMy43MjUsMS44NDdjMC4yOTIsMS4xNzQgLTAuMzIzLDIuMTExIC0xLjg0OCwyLjgxNWMtMS4yOSwwLjY0NiAtMi41NTEsMC45MDkgLTMuNzgyLDAuNzkxYy0xLjc1OSwtMC4xMTYgLTQuMTkzLC0wLjAyMyAtNy4zMDEsMC4yNzljLTEuMTE0LDAuMTI1IC0yLjc4NiwwLjQzNiAtNS4wMTQsMC45MzJjLTEuNjQzLDAuMzA5IC0zLjEzOCwwLjQzMiAtNC40ODYsMC4zNzNjLTIuNjM5LC0wLjIzNCAtMy45NTgsLTEuNDA3IC0zLjk1OCwtMy41MTljMCwtMC4zNTIgMC4wNTgsLTAuNzA0IDAuMTc1LC0xLjA1NmMwLjkyOSwtMS40MDcgMi41ODcsLTIuMTExIDQuOTcxLC0yLjExMWMwLjI5LDAgMC43NTUsMCAxLjM5NiwwYzAuNTgxLDAgMS4wMTcsMCAxLjMwOSwwYzEuMTYyLDAgMS45NzYsLTAuMjA0IDIuNDQxLC0wLjYxNWMwLC0wLjM1MyAwLC0wLjkzOCAwLC0xLjc2di05LjQ5OWMwLjIzNCwtMC42NDYgMC4zMjIsLTEuNTU0IDAuMjY1LC0yLjcyOGMtMC4wNiwtMC45OTYgLTAuMTE4LC0xLjk5MiAtMC4xNzYsLTIuOTljLTAuMDYsLTEuNTgzIC0wLjE3NywtMy4wMiAtMC4zNTMsLTQuMzExYy0wLjExOCwtMi4xMSAtMC4yNjQsLTQuOTI2IC0wLjQzOSwtOC40NDNjMCwwLjE3NiAwLjAyOCwtMC4zODEgMC4wODgsLTEuNjcyYzAuMDU4LC0wLjc2MiAtMC4xMzIsLTEuMjg5IC0wLjU3MSwtMS41ODNjLTAuNDQsLTAuMjkzIC0xLjEzLC0wLjQ0IC0yLjA2NywtMC40NGMtMC40NywwIC0xLjE3NCwwLjA2IC0yLjExMSwwLjE3N2MtMC45MzgsMC4xMTggLTEuNjQzLDAuMTc2IC0yLjExMSwwLjE3NmMtMi4yMjksMCAtMy4zNDIsLTEuMTczIC0zLjM0MiwtMy41MTljMCwtMC4yOTMgMC4yNjIsLTAuNzA0IDAuNzg3LC0xLjIzMWMwLjUyNSwtMC41MjggMC45NjQsLTAuODIgMS4zMTQsLTAuODhjMC43NTgsLTAuMTc2IDIuMzA1LC0wLjIwNCA0LjY0MSwtMC4wODhjMC43LDAgMS43MzYsLTAuMDQ0IDMuMTA3LC0wLjEzMmMxLjM3MiwtMC4wODggMi4zNTEsLTAuMTMyIDIuOTM1LC0wLjEzMmMwLjQwOCwwIDEuMDc5LDAuMjk4IDIuMDE0LDAuODk1YzAuOTM1LDAuNTk3IDEuNTc2LDEuMTkxIDEuOTI3LDEuNzg3YzAuMDU5LDAgMS43MTQsMi45NTUgNC45NjQsOC44NjFjMS4yOTIsMi40MDIgMi43NzYsNC44OCA0LjQ1Miw3LjQyOGMxLjY3NCwyLjU1IDMuNjI4LDUuNjQxIDUuODYxLDkuMjcyYzEuNDY4LDIuNTIxIDMuNjEzLDYuMzI5IDYuNDM1LDExLjQyN2MwLjIzNCwtMC45OTYgMC4zNTMsLTIuMDUyIDAuMzUzLC0zLjE2NmMwLC0wLjI5MyAwLjA1OCwtMC45ODEgMC4xNzYsLTIuMDY3YzAuMTE4LC0xLjA4NCAwLjE3NywtMS44NjEgMC4xNzcsLTIuMzMxYzAsLTAuNDY5IC0wLjA1OSwtMS4yMTYgLTAuMTc2LC0yLjI0M2MtMC4xMTgsLTEuMDI1IC0wLjE3NiwtMS41NjggLTAuMTc2LC0xLjYyN3YtNS4xMDJjMCwtMC41MjggLTAuMTQ2LC03Ljc0MSAtMC40MzYsLTIxLjYzOWMtMC4yMzMsLTAuMDU4IC0wLjQ5NSwtMC4wODggLTAuNzg2LC0wLjA4OGMtMC41MjMsMCAtMS4zMDksMC4xMTggLTIuMzU1LDAuMzUyYy0xLjA0OCwwLjIzNSAtMS43NzQsMC4zODMgLTIuMTgyLDAuNDRjLTAuNzU3LC0wLjA1OCAtMS43NzUsLTAuMDg4IC0zLjA1NSwtMC4wODhjLTAuMDU4LC0wLjA1OCAtMC40NTEsLTAuMzM3IC0xLjE3OCwtMC44MzZjLTAuNzI5LC0wLjQ5OCAtMS4wNjIsLTAuOTI0IC0xLjAwNCwtMS4yNzVjMCwtMC40MDkgMC4xNDYsLTAuOTY4IDAuNDQsLTEuNjcxYzAuODIsLTAuOTk3IDEuOTA0LC0xLjU4NCAzLjI1NCwtMS43NmMxLjExMywtMC4wNTggMi4yMjksLTAuMTE3IDMuMzQzLC0wLjE3NmMyLjk5LC0wLjA1OCA3LjcxLC0wLjM4MSAxNC4xNjEsLTAuOTY4YzAuODgsLTAuMTE2IDEuODE3LDAuMTMyIDIuODE1LDAuNzQ4YzAuOTk2LDAuNjE1IDEuNDk1LDEuMjc1IDEuNDk1LDEuOTc5Yy0wLjAwMSwwLjI5OSAtMC4xMiwwLjU2MyAtMC4zNTMsMC43OTZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==`;

/**
 * Class for TurboWarp blocks
 * @constructor
 */
class TurboWarpBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'tw',
            name: 'NeoMod',
            color1: '#6D4CFF',
            color2: '#6244E6',
            color3: '#463AC7',
            docsURI: 'https://docs.turbowarp.org/blocks',
            menuIconURI: iconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'getLastKeyPressed',
                    text: formatMessage({
                        id: 'tw.blocks.lastKeyPressed',
                        default: 'last key pressed',
                        description: 'Block that returns the last key that was pressed'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getButtonIsDown',
                    text: formatMessage({
                        id: 'tw.blocks.buttonIsDown',
                        default: '[MOUSE_BUTTON] mouse button down?',
                        description: 'Block that returns whether a specific mouse button is down'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        MOUSE_BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'mouseButton',
                            defaultValue: '0'
                        }
                    }
                }
            ],
            menus: {
                mouseButton: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.primary',
                                default: '(0) primary',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.middle',
                                default: '(1) middle',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.secondary',
                                default: '(2) secondary',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '2'
                        }
                    ],
                    acceptReporters: true
                }
            }
        };
    }

    getLastKeyPressed (args, util) {
        return util.ioQuery('keyboard', 'getLastKeyPressed');
    }

    getButtonIsDown (args, util) {
        const button = Cast.toNumber(args.MOUSE_BUTTON);
        return util.ioQuery('mouse', 'getButtonIsDown', [button]);
    }
}

module.exports = TurboWarpBlocks;
