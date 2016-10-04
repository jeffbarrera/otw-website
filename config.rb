###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
page "stories/*", :layout => :story

# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false


# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# blog extension for stories
activate :blog do |blog|
  blog.name = "stories"
  blog.prefix = "stories"
  blog.permalink = "/:slug"
  blog.sources = "/:slug.html"
end

# helper functions
helpers do

  def responsive_img_path(img_name, size)
    img_base = File.basename( img_name, ".*" )
    img_ext = File.extname(img_name)
    full_img = "#{img_base}_#{size} #{img_ext}"

    image_path(full_img)
  end

end

# External Pipeline for Gulp builds
activate :external_pipeline,
  name: :gulp,
  command: "./node_modules/gulp/bin/gulp.js",
  source: "temp"

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Pretty URLs
  activate :directory_indexes

  activate :asset_hash, :ignore => %r{^images/.*}

  # relative assets (at least while developing)
  # activate :relative_assets

end
