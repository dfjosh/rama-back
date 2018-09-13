class SetProjectPostImages < ActiveRecord::Migration[5.2]
  PROJECT_POSTS = [
    {
      id: 110,
      img: "/uploads/2015/07/Dartboard2.jpg",
      url: "http://distantfuturejosh.com/dartcalc/dartCalc.py"
    },
    {
      id: 109,
      img: "/uploads/2014/10/PSP_001660_2570.jpg",
      url: "http://distantfuturejosh.com/marslongform/"
    },
    {
      id: 108,
      img: "/uploads/2014/04/flags1.jpg",
      url: "http://distantfuturejosh.com/landjacks"
    },
    {
      id: 107,
      img: "/uploads/2014/03/destroyallsites.jpg",
      url: "http://distantfuturejosh.com/destroyallsites"
    },
    {
      id: 106,
      img: "/uploads/2014/02/kung-fu-post.jpg",
      url: "http://distantfuturejosh.com/kungfu"
    },
    {
      id: 105,
      img: "/uploads/2013/12/endomoons.jpg",
      url: "http://distantfuturejosh.com/endomoons"
    },
    {
      id: 103,
      img: "/uploads/2013/11/colorly_huge.jpg",
      url: "http://distantfuturejosh.com/colorly"
    },
    {
      id: 102,
      img: "/uploads/2013/11/scalesolarsystem_huge.jpg",
      url: "http://distantfuturejosh.com/scalesolarsystem"
    },
    {
      id: 101,
      img: "/uploads/2013/09/dark_huge.jpg",
      url: "http://distantfuturejosh.com/books/dark.html"
    },
    {
      id: 100,
      img: "/uploads/2013/09/solarsystem_huge.jpg",
      url: "http://distantfuturejosh.com/books/solarsystem.html"
    } ,
    {
      id: 80,
      img: "/uploads/2013/11/design_huge.jpg",
      url: "http://distantfuturejosh.com/playground/design"
    },
    {
      id: 20,
      img: "/uploads/2013/12/noformat_huge2.jpg",
      url: "http://distantfuturejosh.com/noformat"
    }
  ]
  
  def up
    Post.reset_column_information
    PROJECT_POSTS.each do |post_hash|
      post = Post.find(post_hash[:id])
      post.feature_image = post_hash[:img]
      post.feature_link = post_hash[:url]
      post.save!
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end