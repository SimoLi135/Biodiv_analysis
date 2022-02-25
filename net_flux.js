{\rtf1\ansi\ansicpg1252\cocoartf2636
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
var country = ee.FeatureCollection('users/simonalippi13/gaul_acp_terr');\
\
var ago = country.filter(ee.Filter.eq('isoa3_id', 'AGO'));\
\
var flux = ee.ImageCollection('projects/wri-datalab/gfw-data-lake/net-flux-forest-extent-per-ha-v1-2-1-2001-2020/net-flux-global-forest-extent-per-ha-2001-2020');\
\
var flux_image = ee.Image(flux.reduce(ee.Reducer.min()).multiply(0.09)).clip(ago);\
\
\
\
print(flux_image)\
var flux_tot = (flux_image.divide(1000000)).divide(20).reduceRegions(\{\
  'collection': ago,\
  'reducer': ee.Reducer.sum(),\
   'scale': 30\
\});\
print(flux_tot);\
\
\
\
Export.table.toDrive(\{\
  collection: flux_tot,\
  description:'test',\
  fileFormat: 'CSV'\
\});}