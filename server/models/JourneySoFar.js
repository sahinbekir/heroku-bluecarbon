const mongoose = require('mongoose');

const journeySoFar = new mongoose.Schema({

    arrow_map: {
        am_text: {
            type: String
        },
        arrow_bg1: {
            type: String
        },
        arrow1: {
            type: String
        },
        arrow_bg2: {
            type: String
        },
        arrow2: {
            type: String
        }
        
    },
    background_img: {
        loading_img: {
            type: String
        },
        map_progress_bg: {
            type: String
        }
    },
    cursor_map: {
        cur_drag: {
            type: String
        },
        cur_pin: {
            type: String
        },
        cur_click: {
            type: String
        },
    },
    paragraph_map: {
        pm_title: {
            type: String
        },
        pm_p1: {
            type: String
        },
        pm_p2: {
            type: String
        },
        pm_p3: {
            type: String
        }
    },
    bottom_text: {
        bt_text: {
            type: String
        },
        bt_url: {
            type: String
        },
        bt_links:{
            seo1: {
                type: String
            },
            seo2: {
                type: String
            },
            seo3: {
                type: String
            },
            seo4: {
                type: String
            }
        }
    }
});

module.exports = mongoose.model('JourneySoFar', journeySoFar);