class SetProjectPostImages < ActiveRecord::Migration[5.2]
  PROJECT_POSTS = [
    {
      slug: "dartcalc",
      img: "/uploads/2015/07/Dartboard2.jpg",
      url: "http://distantfuturejosh.com/dartcalc/dartCalc.py"
    },
    {
      slug: "mars-longform",
      img: "/uploads/2014/10/PSP_001660_2570.jpg",
      url: "http://distantfuturejosh.com/marslongform/"
    },
    {
      slug: "land-jacks",
      img: "/uploads/2014/04/flags1.jpg",
      url: "http://distantfuturejosh.com/landjacks"
    },
    {
      slug: "destroy-all-sites",
      img: "/uploads/2014/03/destroyallsites.jpg",
      url: "http://distantfuturejosh.com/destroyallsites"
    },
    {
      slug: "kung-fu",
      img: "/uploads/2014/02/kung-fu-post.jpg",
      url: "http://distantfuturejosh.com/kungfu"
    },
    {
      slug: "endomoons",
      img: "/uploads/2013/12/endomoons.jpg",
      url: "http://distantfuturejosh.com/endomoons"
    },
    {
      slug: "colorly",
      img: "/uploads/2013/11/colorly_huge.jpg",
      url: "http://distantfuturejosh.com/colorly"
    },
    {
      slug: "scale-solar-system",
      img: "/uploads/2013/11/scalesolarsystem_huge.jpg",
      url: "http://distantfuturejosh.com/scalesolarsystem"
    },
    {
      slug: "books",
      img: "/uploads/2013/09/dark_huge.jpg",
      url: "http://distantfuturejosh.com/books/dark.html"
    },
    {
      slug: "the-solar-system-at-closest-approach",
      img: "/uploads/2013/09/solarsystem_huge.jpg",
      url: "http://distantfuturejosh.com/books/solarsystem.html"
    } ,
    {
      slug: "design",
      img: "/uploads/2013/11/design_huge.jpg",
      url: "http://distantfuturejosh.com/playground/design"
    },
    {
      slug: "no-format-podcast",
      img: "/uploads/2013/12/noformat_huge2.jpg",
      url: "http://distantfuturejosh.com/noformat"
    }
  ]
  
  def up
    Post.reset_column_information
    PROJECT_POSTS.each do |post_hash|
      post = Post.find_by_slug(post_hash[:slug])
      post.feature_image = post_hash[:img]
      post.feature_link = post_hash[:url]
      post.save!
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end