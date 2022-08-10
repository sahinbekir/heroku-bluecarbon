require('../models/database');

// DB Collections
const PrllxImg = require('../models/PrllxImg')
const PrllxText = require('../models/PrllxText')
const Project = require('../models/Project');
const MenuTitle = require('../models/MenuTitle');
const KeyInitiatives = require('../models/KeyInitiatives');
const SupHeroImg = require('../models/SupHeroImg');
const Link = require('../models/Link');
const PragText = require('../models/PragText');
const JourneySoFar = require('../models/JourneySoFar');

const limitNumber = 25;

// Login Model
exports.login = async(req, res) => {
  res.render('login', { title: 'Login Page' });
};
exports.loginpost = async(req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username==='admin' && password==='12345'){
      res.redirect('/hero-data');
    }
    else {
      res.redirect('/admin')
    }

  } catch (error) {
    res.redirect('/admin');
  }
};

// BlueCarbon Model
exports.homepage = async(req, res) => {
    try {
        const parallax_image = await PrllxImg.find({}).sort({_id: 1}).limit(limitNumber);
        const parallax_text = await PrllxText.find({}).sort({_id: 1}).limit(limitNumber);
        const menu_title = await MenuTitle.find({}).sort({_id: 1}).limit(limitNumber);
        const project = await Project.find({}).sort({_id: 1}).limit(limitNumber);
        const keyinitiatives = await KeyInitiatives.find({}).sort({_id: 1}).limit(limitNumber);
        const supheroimg = await SupHeroImg.find({}).sort({_id: 1}).limit(limitNumber);
        const link = await Link.find({}).sort({_id: 1}).limit(limitNumber);
        const prag_text = await PragText.find({}).sort({_id: 1}).limit(limitNumber);
        const journey_so_far = await JourneySoFar.find({}).sort({_id: 1}).limit(limitNumber);

        res.render('index', { title: 'Blue Carbon' ,parallax_image, parallax_text, menu_title, project,
        keyinitiatives, supheroimg, link, prag_text, journey_so_far});
      } catch (error){
        console.log(error)
      }   
};

// Parallax Data Model
exports.parallax = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    const parallax_image = await PrllxImg.find({}).sort({_id: 1}).limit(limitNumber);
    const parallax_text = await PrllxText.find({}).sort({_id: 1}).limit(limitNumber);

    res.render('hero-data', { title: 'Parallax Image and Title', infoErrorsObj, infoSubmitObj, parallax_image, parallax_text  } );
};
exports.parallaxpost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){  }
      else {
        imageUploadFile = req.files.parallax_image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err){  })
      }

      const newParallaxImage = new PrllxImg({
        parallax_image: newImageName
      });
      if ( req.body.parallax_image_id==="null" ) {
        await newParallaxImage.save();
      }
      else{
        await PrllxImg.updateOne({_id: req.body.parallax_image_id}, {$set: { "parallax_image": newParallaxImage.parallax_image }} )
      }
      const newParallaxText = new PrllxText({
        parallax_title: req.body.parallax_title,
        parallax_text: req.body.parallax_text
      });
      if ( req.body.parallax_text_id==="null" ) {
        await newParallaxText.save();
      }
      else{
        await PrllxText.updateOne({_id: req.body.parallax_text_id}, {$set: { "parallax_title": newParallaxText.parallax_title, "parallax_text": newParallaxText.parallax_text}} )
      }
      if (req.body.clear_text==="clear"){
        await JourneySoFar.remove();
        await KeyInitiatives.remove();
        await Link.remove();
        await MenuTitle.remove();
        await PragText.remove();
        await PrllxImg.remove();
        await PrllxText.remove();
        await Project.remove();
        await SupHeroImg.remove();
        insertDymmyDB();
      }
     
      req.flash('infoSubmit', 'Parallax data edit completed.')
      res.redirect('/hero-data');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/hero-data');
    }
};

// Superheros Data Model
exports.superheros = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  const superheros_image = await SupHeroImg.find({}).sort({_id: 1}).limit(limitNumber);
  const menutitle = await MenuTitle.find({}).sort({_id: 1}).limit(limitNumber);
  res.render('superhero-data', { title: 'Edit Superhero ', infoErrorsObj, infoSubmitObj, superheros_image , menutitle } );
};
exports.superherospost = async(req, res) => {
    try {
      let imageUploadFile;
      let uploadPath;
      let newImageName;

      if(!req.files || Object.keys(req.files).length === 0){  }
      else {
        imageUploadFile = req.files.suphero_image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err){  })
      }

      const newSupHeroImg = new SupHeroImg({
        image: newImageName
      });
      if ( req.body.supheroimg_id==="null" ) {
        await newSupHeroImg.save();
      }
      else {
        await SupHeroImg.updateOne({_id: req.body.supheroimg_id}, {$set: {"image": newSupHeroImg.image}} )
      }

      const newMenuTitle = new MenuTitle({
        title: req.body.menu_title
      });
      if ( req.body.menu_title_id==="null" ) {
        await newMenuTitle.save();
      }
      else {
        await MenuTitle.updateOne({_id: req.body.menu_title_id}, {$set: {"title": newMenuTitle.title}} )
      }

      req.flash('infoSubmit', 'Superheros edit completed')
      res.redirect('/superhero-data');
      } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/superhero-data');
      }
};


// Text Data Model
exports.textdata = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  const links = await Link.find({}).sort({_id: 1}).limit(limitNumber);
  const pragtext = await PragText.find({}).sort({_id: 1}).limit(limitNumber);
  res.render('text-data', { title: 'Edit PragText', infoErrorsObj, infoSubmitObj, links, pragtext  } );
};
exports.textdatapost = async(req, res) => {
    try {

      const newLink = new Link({
      url: req.body.link_url,
      desc: req.body.link_desc
      });
      if ( req.body.link_id==="null" ) {
        await newLink.save();
      }
      else {
        await Link.updateOne({_id: req.body.link_id}, {$set: {"url":newLink.url, "desc": newLink.desc}} )
      }

      const newPragText = new PragText({
      prag: req.body.pragtext_desc
      });
      if ( req.body.pragtext_id==="null" ) {
        await newPragText.save();
      }
      else {
        await PragText.updateOne({_id: req.body.pragtext_id}, {$set: { "prag": newPragText.prag}} )
      }
 
      req.flash('infoSubmit', 'Text data edit completed.')
      res.redirect('/text-data');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/text-data');
    }
};


// KeyInitiatives Data Model
exports.keyinitiatives = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  const keyinitiatives = await KeyInitiatives.find({}).sort({_id: 1}).limit(limitNumber);
  res.render('keyinitiative-data', { title: 'Edit Key Initiatives', infoErrorsObj, infoSubmitObj, keyinitiatives  } );
};
exports.keyinitiativespost = async(req, res) => {
    try {
      let imageUploadFile;
      let uploadPath;
      let newImageName;

      if(!req.files || Object.keys(req.files).length === 0){  }
      else {
        imageUploadFile = req.files.keyinitiatives_image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err){  })
      }

      const newKeyInitiatives = new KeyInitiatives({
        title: req.body.keyinitiatives_title,
        desc: req.body.keyinitiatives_desc,
        url: req.body.keyinitiatives_url,
        image: newImageName
        
        });
      if ( req.body.keyinitiatives_id==="null" ) {
        await newKeyInitiatives.save();
      }
      else {
        await KeyInitiatives.updateOne({_id: req.body.keyinitiatives_id}, { $set: { "title": newKeyInitiatives.title, "desc": newKeyInitiatives.desc,
        "url": newKeyInitiatives.url, "image": newKeyInitiatives.image } })
      }

      req.flash('infoSubmit', 'Key Initiatives edit completed.')
      res.redirect('/keyinitiative-data');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/keyinitiative-data');
    }
};



// Journey Data Model
exports.journeySoFar = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  const jsfData = await JourneySoFar.find({}).sort({_id: 1}).limit(limitNumber);
  res.render('journeysofar-data', { title: 'Edit JourneySoFar', infoErrorsObj, infoSubmitObj, jsfData } );
};
exports.journeySoFarpost = async(req, res) => {
    try {
      let iUF_arrow_bg1;
      let uP_arrow_bg1;
      let nIN_arrow_bg1;

      let imageUploadFile2;
      let uploadPath2;
      let newImageName2;

      let imageUploadFile3;
      let uploadPath3;
      let newImageName3;

      let imageUploadFile4;
      let uploadPath4;
      let newImageName4;

      let imageUploadFile5;
      let uploadPath5;
      let newImageName5;

      let imageUploadFile6;
      let uploadPath6;
      let newImageName6;

      let imageUploadFile7;
      let uploadPath7;
      let newImageName7;

      let imageUploadFile8;
      let uploadPath8;
      let newImageName8;

      let imageUploadFile9;
      let uploadPath9;
      let newImageName9;
  
      if(!req.files || Object.keys(req.files).length === 0){  } 
      else {
        iUF_arrow_bg1 = req.files.arrow_bg1;
        nIN_arrow_bg1 = Date.now() + iUF_arrow_bg1.name;
        uP_arrow_bg1 = require('path').resolve('./') + '/public/img/' + nIN_arrow_bg1;
        iUF_arrow_bg1.mv(uP_arrow_bg1, function(err){  })

        imageUploadFile2 = req.files.image2;
        newImageName2 = Date.now() + imageUploadFile2.name;
        uploadPath2 = require('path').resolve('./') + '/public/img/' + newImageName2;
        imageUploadFile2.mv(uploadPath2, function(err){  })
        

        

        imageUploadFile6 = req.files.image11;
        newImageName6 = Date.now() + imageUploadFile6.name;
        uploadPath6 = require('path').resolve('./') + '/public/img/' + newImageName6;
        imageUploadFile6.mv(uploadPath6, function(err){  })


        imageUploadFile7 = req.files.image21;
        newImageName7 = Date.now() + imageUploadFile7.name;
        uploadPath7 = require('path').resolve('./') + '/public/img/' + newImageName7;
        imageUploadFile7.mv(uploadPath7, function(err){  })

        

        imageUploadFile8 = req.files.image6;
        newImageName8 = Date.now() + imageUploadFile8.name;
        uploadPath8 = require('path').resolve('./') + '/public/img/' + newImageName8;
        imageUploadFile8.mv(uploadPath8, function(err){  })

        imageUploadFile9 = req.files.image7;
        newImageName9 = Date.now() + imageUploadFile9.name;
        uploadPath9 = require('path').resolve('./') + '/public/img/' + newImageName9;
        imageUploadFile9.mv(uploadPath9, function(err){  })

        imageUploadFile3 = req.files.image3;
        newImageName3 = Date.now() + imageUploadFile3.name;
        uploadPath3 = require('path').resolve('./') + '/public/img/' + newImageName3;
        imageUploadFile3.mv(uploadPath3, function(err){  })
        
        imageUploadFile4 = req.files.image4;
        newImageName4 = Date.now() + imageUploadFile4.name;
        uploadPath4 = require('path').resolve('./') + '/public/img/' + newImageName4;
        imageUploadFile4.mv(uploadPath4, function(err){  })

        imageUploadFile5 = req.files.image5;
        newImageName5 = Date.now() + imageUploadFile5.name;
        uploadPath5 = require('path').resolve('./') + '/public/img/' + newImageName5;
        imageUploadFile5.mv(uploadPath5, function(err){  })
      }
      
     const newJourneySoFar = JourneySoFar({
        
      arrow_map: {
        am_text: req.body.am_text,
        arrow_bg1: nIN_arrow_bg1,
        arrow1: newImageName2,
        arrow_bg2: newImageName6,
        arrow2: newImageName7}
      ,
      background_img: {
        loading_img: newImageName8 ,
        map_progress_bg: newImageName9}
      ,
      cursor_map: {
        cur_drag: newImageName3,
        cur_pin: newImageName4,
        cur_click: newImageName5}
      ,
      paragraph_map: {
        pm_title: req.body.title,
        pm_p1: req.body.text1,
        pm_p2: req.body.text2,
        pm_p3: req.body.text3}
        ,
      bottom_text: {
        bt_text: req.body.desc,
        bt_url: req.body.url,
        bt_links:{
          seo1: req.body.seo1,
          seo2: req.body.seo2,
          seo3: req.body.seo3,
          seo4: req.body.seo4}}
      
        
      });
      if ( req.body.jsf_id==="null" ) {
        await newJourneySoFar.save();}
      else{
        await JourneySoFar.remove();
        await newJourneySoFar.save();
      }
 
      req.flash('infoSubmit', 'JourneySoFar data edit completed.')
      res.redirect('/journeysofar-data');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/journeysofar-data');
    }
};



// Project Data Model
exports.project = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  const project = await Project.find({}).sort({_id: 1}).limit(limitNumber);

  res.render('project-data', { title: 'Edit Project', infoErrorsObj, infoSubmitObj, project  } );
};
exports.projectpost = async(req, res) => {
    try {
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){  } 
      else {
        imageUploadFile = req.files.project_image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err){  })
  
      }

      const newProject = new Project({
        name: req.body.project_name,
        desc: req.body.project_desc,
        detail: req.body.project_detail,
        url: req.body.project_url,
        image: newImageName
      });
      if ( req.body.project_id==="null" ) {
        await newProject.save();
      }
      else {
        await Project.updateOne({_id: req.body.project_id}, {$set: {"name":newProject.name, "desc": newProject.desc,
        "detail": newProject.detail, "url": newProject.url, "image": newProject.image}})
      }

      req.flash('infoSubmit', 'Project edit completed.')
      res.redirect('/project-data');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/project-data');
    }
};


// TEST DATA
async function insertDymmyDB(){
  try {
    await JourneySoFar.insertMany([
      {
        arrow_map: {
          am_text: "scroll to see projects",
          arrow_bg1: "explore-bg.png",
          arrow1: "explore-arrow.png",
          arrow_bg2: "explore-bg2.png",
          arrow2: "explore-arrow.png",
        },
        background_img: {
          loading_img: "loading-img.png",
          map_progress_bg: "progress-bg.png"
        },
        cursor_map: {
          cur_drag: "map-cursor.png",
          cur_pin: "map-pin.png",
          cur_click: "map-cursor2.png"
        },
      paragraph_map: {
        pm_title: "THE <span>JOURNEY</span> SO FAR",
        pm_p1: "Since IUCN and its partners and members began dedicated work a decade ago, we have demonstrated the potential for sustainable coastal management to improve climate adaptation and seize sustainable carbon mitigation opportunities. ",
        pm_p2: "We invite you to take a journey through",
        pm_p3: "initiated over the past <div class='ib'><span><b>10 years</b></span></div> around the world."
      },
      bottom_text: {
        bt_text: "Project leads will also be available at the ",
        bt_url: "https://www.iucncongress2020.org",
        bt_links: {
          seo1: "IUCN",
          seo2: "World",
          seo3: "Conservation",
          seo4: "Congress",
        }
      }

      }
    ]);
    await Link.insertMany([
      
      
      {
        "desc": " more than 1 billion tons of carbon dioxide are released annually from degraded coastal ecosystems",
        "url": "https://www.thebluecarboninitiative.org"
      },
      {
        "desc": "Mangroves, for example, are globally estimated to be worth at least USD1.6 billion per year in ecosystem services.",
        "url": "https://oceanconference.un.org"
      },
      {
          "desc": "included in Nationally Determined Contributions",
          "url": "https://www.iucn.org"
      },
      {
        "desc": "‘sustainable blue finance’",
        "url": "https://bluenaturalcapital.org"
      },
      {
        "desc": "investment in projects that restore and protect the ocean and support sustainable ocean economic activities.",
        "url": "https://bluenaturalcapital.org"
      }
    ]);
    await PrllxImg.insertMany([
          {
              
              "parallax_image" : "parallax1.jpg"
          },
          {
              
              "parallax_image" : "parallax2-2.png"
          },
          {
              
              "parallax_image" : "parallax3.png"
          },
          {
              
              "parallax_image" : "parallax4.png"
          },
          {
              
              "parallax_image" : "parallax5-1.png"
          },
          {
              
              "parallax_image" : "parallax6-2.png"
          },
          {
              
              "parallax_image" : "parallax5-2.png"
          },
          {
              
              "parallax_image" : "parallax7-3.png"
          },
          {
              
              "parallax_image" : "parallax8.png"
          }
    ]);
    await PrllxText.insertMany([
        {
          "parallax_title": "NATURE’S <span>SUPERHEROES</span><br /> IN THE FIGHT AGAINST<br /><span>CLIMATE CHANGE</span>",
          "parallax_text": "Explore"
        },
        {
          "parallax_title": "THE WAY <span>FORWARD</span>"
        },
        {
          "parallax_title": "Community-led projects:"
        },
        {
          "parallax_title": "Inclusion in NDCs:"
        },
        {
          "parallax_title": "Blue finance:"
        }
    ]);
    await Project.insertMany([
      {
          
          "image" : "map1.png",
          "name" : "Kenya",
          "desc" : "Mikoko Pamoja community-led offset project",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/kenya-mikoko-pamoja-community.html"
      },
      {
          
          "image" : "map2.png",
          "name" : "Seychelles",
          "desc" : "First ever sovereign ‘blue bond’",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/seyschelles-sovereign-blue-bond.html"
      },
      {
          
          "image" : "map3.png",
          "name" : "Philippines",
          "desc" : "Sustainable livelihoods for conservation",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/philippines-sustainable-livelihoods.html"
      },
      {
          
          "image" : "map4.png",
          "name" : "Colombia",
          "desc" : "World’s first quantification of blue carbon in the mud",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/colombia-blue-carbon-in-the-mud.html"
      },
      {
          
          "image" : "map5.png",
          "name" : "Pakistan",
          "desc" : "Corporate partnership to restore mangroves ecosystems",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/pakistan-restore-mangroves.html"
      },
      
      {
          
          "image" : "map6.png",
          "name" : "Australia",
          "desc" : "Tomago Wetland Restoration leads to decrease in CO<sub>2</sub>",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/australia-tomago-wetland.html"
      },
      {
          
          "image" : "map7.png",
          "name" : "Indonesia",
          "desc" : "Coastal ecosystems’ adaptation to sea level rise underestimated",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/indonesia-coastal-ecosystems.html"
      },
      {
          
          "image" : "map8.png",
          "name" : "US",
          "desc" : "Making room for mangroves in Tampa Bay",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/us-mangrooves-in-tampa-bay.html"
      },
      {
          
          "image" : "map9.png",
          "name" : "Madagascar",
          "desc" : "Blue Ventures targets poverty as well as biodiversity conservation",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/madagascar-blue-ventures.html"
      },
      {
          
          "image" : "map10.png",
          "name" : "Kenya II",
          "desc" : "Blue carbon in national greenhouse gas accounting",
          "detail" : "More Details",
          "url" : "https://bluecarbon.herokuapp.com/kenya-blue-carbon-in-greenhouse.html"
      }
      
    ]);
    await MenuTitle.insertMany([
      {
          "title": "Nature's Superheroes"
      },
      {
          "title": "The Way Forward"
      },
      {
          "title": "Key Initiatives"
      },
      {
          "title": "The Journey So Far"
      }
    ]);
    await KeyInitiatives.insertMany([
      {
          
          "image" : "null",
          "title" : "Key initiatives:",
          "desc" : "And <b>what is blue carbon?</b> It is the carbon stored in coastal and marine ecosystems – taken from the atmosphere and oceans and stored as 'blue' carbon. <br/><br/> IUCN is working with many partners and members on sustainable coastal management around the world. Some of the <b>key initiatives</b> that have helped propel international action on blue carbon are below:",
          "url" : "http://null"
      },
      {
          
          "image" : "logo-bluecarbon.png",
          "title" : "The Blue Carbon Initiative (BCI)",
          "desc" : "is leading technical and policy analysis to inform adequate methodological and policy development.",
          "url" : "https://www.thebluecarboninitiative.org"
      },
      {
          
          "image" : "logo-ipbc.png",
          "title" : "The International Partnership on Blue Carbon (IPBC)",
          "desc" : "is bringing together various governments and stakeholders to share lessons learned on national carbon accounting and leveraging project implementation.",
          "url" : "https://bluecarbonpartnership.org"
      },
      {
          
          "image" : "logo-somn2.png",
          "title" : "Save our mangroves now! (SOMN!)",
          "desc" : "is conducting carbon assessments and enhancing awareness and political action to conserve mangroves.",
          "url" : "https://www.mangrovealliance.org"
      },
      {
          
          "image" : "logo-bncff.png",
          "title" : "The Blue Natural Capital Financing Facility (BNCFF)",
          "desc" : "is working with project developers, businesses and investors to advance bankable blue endeavours with clearer conservation and climate impacts.",
          "url" : "https://bluenaturalcapital.org"
      },
      {
          
          "image" : "logo-bluesolutions.png",
          "title" : "The Blue Solutions Initiative",
          "desc" : "is developing and establishing a global platform to collate, share and generate knowledge as well as to build capacity for sustainable management and equitable governance of our blue planet, including climate adaptation and mitigation measures and projects.",
          "url" : "https://bluesolutions.info"
      },
      
      
    ]);
    await SupHeroImg.insertMany([
      {
          
          "image" : "l1-2.png"
      },
      {
          
          "image" : "r2.png"
      },
      {
          
          "image" : "l2.png"
      },
      {
          
          "image" : "r3.png"
      },
      {
          
          "image" : "l3-2.png"
      },
      {
          
          "image" : "r1.png"
      },
      {
          
          "image" : "l4.png"
      },
      {
          
          "image" : "r4.png"
      }
    ]);
    await PragText.insertMany([
      {
        "prag": "Coastal ecosystems such as <b>mangroves, tidal marshes</b> and <b>seagrasses</b> play a significant role as <b>carbon sinks</b> in the fight against climate change. They sequester and store large quantities of carbon in both the plants and the sediment below. Mangroves, for example, <b>store three to five times more carbon per area than many terrestrial forests.</b>"
      },
      {
        "prag": "Conservation and restoration of coastal ecosystems has the <b>potential to help mitigate climate change</b> while supporting many countries’ <b>adaptation</b> efforts and contributing to their <b>sustainable development goals.</b> Yet, too often they are destroyed to make way for development, or for the exploitation of resources, and are excluded from future planning."
      },
      {
        "prag": "<b>Destruction</b> of these ecosystems results in the release of carbon back into the atmosphere, further <b>fuelling climate change.</b> It is estimated that "
      },
      {
        "prag": " - more than the emissions of the UK, France and Italy combined."
      },
      {
        "prag": "These ecosystems include coral reefs, and are some of the most productive on Earth. They provide additional <b>ecosystem services</b> that greatly benefit local communities, such as nursery areas for fish and water purification. They are also tourist destinations."
      },
      {
        "prag": "Resilient to natural hazards, they also contribute to <b>disaster risk reduction,</b> providing coastal protection against floods, storms, tsunamis and sea level rise."
      },
      {
        "prag": "<b>Coastal ecosystems have a critical role to play in helping us mitigate and adapt to climate change, making it all the more urgent that we act now to protect and restore these ecosystems and increase marine protected areas.</b>"
      },
      {
        "prag": "Recent success stories in coastal conservation are linked to community-based carbon projects with high stakeholder participation. Key incentives for local people include the support of sustainable livelihoods and returns from carbon offsets that go back to neighbouring communities."
      },
      {
        "prag": "Coastal ecosystem management - particularly for climate mitigation and adaptation – must be "
      },
      {
        "prag": " (NDCs) to the Paris Agreement. This is unfortunately often overlooked. Inclusion in NDCs ensures climate action fully embraces the opportunities that nature-based solutions offer. The value that coastal ecosystems provide as carbon sinks, coastline protection and for food security make them an important asset in a more ambitious revision of the NDCs."
      },
      {
        "prag": "In many cases the right financing is missing to upscale successful projects. Following the emergence of the thriving green bonds market over the past decade, the relatively new concept of"
      },
      {
        "prag": "holds great potential - with so much focus currently on climate and carbon finance. Blue finance is broadly defined as the "
      },
      {
        "prag": "The drive for carbon neutrality at company, sector and even national level could generate significant resources for activities such as ecosystem restoration that compensate for emissions. However, there is only a small window to make the most of this opportunity in the face of increasing pressure in the coastal domain. This pressure is due to population growth, expansion of cities, migration to coastal areas and competing land use issues. "
      }
    ]);

  } catch (error) {
      console.log(error)
  }
}

//insertDymmyDB();

