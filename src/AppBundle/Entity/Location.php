<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="location")
  */
class Location
{


    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     *
     */
    protected $name;
    /**
     * @ORM\Column(type="text", nullable=true)
     *
     */
     protected $Url;
     /**
      * @ORM\Column(type="text", nullable=true)
      *
      */
     protected $type;
     /**
      * @ORM\Column(type="text", nullable=true)
      *
      */

    protected $description;
    /**
     * @ORM\Column(type="text", nullable=true)
     *
     */
    protected $imgUrl;
    /**
       * @ORM\Column(type="string", length=255, nullable=true)
       */
      protected $address;

    /**
    * @ORM\Column(type="decimal", precision=8, scale=6, nullable=true)
    */

   protected $lat;
    /**
       * @ORM\Column(type="decimal", precision=8, scale=6, nullable=true)
       */
   protected $lng;
   /**
    * @ORM\Column(type="text", nullable=true)
    *
    */
   protected $website;
   /**
    * @ORM\Column(type="text", nullable=true)
    *
    */
   protected $phone;

   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $monFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $monTo;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $tueFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $tueTo;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $wedFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $wedTo;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $thuFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $thuTo;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $friFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $friTo;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $satFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $satTo;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $sunFrom;
   /**
    * @ORM\Column(type="time", nullable=true)
    *
    */
   protected $sunTo;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $monClosed;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $tueClosed;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $wedClosed;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $thuClosed;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $friClosed;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $satClosed;
   /**
    * @ORM\Column(type="boolean", nullable=true)
    *
    */
   protected $sunClosed;


   /**
    * @var \Doctrine\Common\Collections\Collection|Product[]
    *
      * @ORM\ManyToMany(targetEntity="Product", mappedBy="locations")
    * @ORM\JoinTable(name="ProductsLocations",
      *      joinColumns={@ORM\JoinColumn(name="plID", referencedColumnName="id")},
      *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
      *      )
      **/
     private $products;
     /**
      * @var \Doctrine\Common\Collections\Collection|Location[]
      *
        * @ORM\ManyToMany(targetEntity="Location")
      * @ORM\JoinTable(name="subLocations",
        *      joinColumns={@ORM\JoinColumn(name="lfID", referencedColumnName="id")},
        *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
        *      )
        **/
       private $locations;
    /**
     * @var \Doctrine\Common\Collections\Collection|User[]
     * Many products have One user.
     * @ORM\ManyToOne(targetEntity="User", inversedBy="products")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */

    protected $user;
    /**
     *
    * @var \Doctrine\Common\Collections\Collection|User[]
    * @ORM\ManyToMany(targetEntity="User", inversedBy="dlocations")
    * @ORM\JoinTable(name="dlocationsusers",
    *      joinColumns={@ORM\JoinColumn(name="duID", referencedColumnName="id")},
    *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
    *      )
    **/
   protected $userds;
     /**
     * Default constructor, initializes collections
     */


     /**
     * Constructor
     */
    public function __construct()
    {
        $this->products = new \Doctrine\Common\Collections\ArrayCollection();
          $this->locations = new \Doctrine\Common\Collections\ArrayCollection();
          $this->userds = new \Doctrine\Common\Collections\ArrayCollection();
    }




    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Location
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Location
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Location
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set address
     *
     * @param string $address
     *
     * @return Location
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set lat
     *
     * @param string $lat
     *
     * @return Location
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat
     *
     * @return string
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lng
     *
     * @param string $lng
     *
     * @return Location
     */
    public function setLng($lng)
    {
        $this->lng = $lng;

        return $this;
    }

    /**
     * Get lng
     *
     * @return string
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Add product
     *
     * @param \AppBundle\Entity\Product $product
     *
     * @return Location
     */
    public function addProduct(\AppBundle\Entity\Product $product)
    {
        $this->products[] = $product;

        return $this;
    }

    /**
     * Remove product
     *
     * @param \AppBundle\Entity\Product $product
     */
    public function removeProduct(\AppBundle\Entity\Product $product)
    {
        $this->products->removeElement($product);
    }

    /**
     * Get products
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return Location
     */
    public function setUser(\AppBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \AppBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Add location
     *
     * @param \AppBundle\Entity\Location $location
     *
     * @return Location
     */
    public function addLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations[]= $location;
        //$location->addLocation($this);

        return $this;
    }

    /**
     * Remove location
     *
     * @param \AppBundle\Entity\Location $location
     */
    public function removeLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations->removeElement($location);
    }

    /**
     * Get locations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLocations()
    {
        return $this->locations;
    }


    /**
     * Set url
     *
     * @param string $url
     *
     * @return Location
     */
    public function setUrl($url)
    {
        $this->Url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->Url;
    }

    /**
     * Set imgUrl
     *
     * @param string $imgUrl
     *
     * @return Location
     */
    public function setImgUrl($imgUrl)
    {
        $this->imgUrl = $imgUrl;

        return $this;
    }

    /**
     * Get imgUrl
     *
     * @return string
     */
    public function getImgUrl()
    {
        return $this->imgUrl;
    }



    /**
     * Add userd
     *
     * @param \AppBundle\Entity\User $userd
     *
     * @return Location
     */
    public function addUserd(\AppBundle\Entity\User $userd)
    {
        $this->userds[] = $userd;

        return $this;
    }

    /**
     * Remove userd
     *
     * @param \AppBundle\Entity\User $userd
     */
    public function removeUserd(\AppBundle\Entity\User $userd)
    {
        $this->userds->removeElement($userd);
    }

    /**
     * Get userds
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUserds()
    {
        return $this->userds;
    }

    /**
     * Set website
     *
     * @param string $website
     *
     * @return Location
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get website
     *
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set phone
     *
     * @param string $phone
     *
     * @return Location
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set monFrom
     *
     * @param \DateTime $monFrom
     *
     * @return Location
     */
    public function setMonFrom($monFrom)
    {
        $this->monFrom = $monFrom;

        return $this;
    }

    /**
     * Get monFrom
     *
     * @return \DateTime
     */
    public function getMonFrom()
    {
        return $this->monFrom;
    }

    /**
     * Set monTo
     *
     * @param \DateTime $monTo
     *
     * @return Location
     */
    public function setMonTo($monTo)
    {
        $this->monTo = $monTo;

        return $this;
    }

    /**
     * Get monTo
     *
     * @return \DateTime
     */
    public function getMonTo()
    {
        return $this->monTo;
    }

    /**
     * Set tueFrom
     *
     * @param \DateTime $tueFrom
     *
     * @return Location
     */
    public function setTueFrom($tueFrom)
    {
        $this->tueFrom = $tueFrom;

        return $this;
    }

    /**
     * Get tueFrom
     *
     * @return \DateTime
     */
    public function getTueFrom()
    {
        return $this->tueFrom;
    }

    /**
     * Set tueTo
     *
     * @param \DateTime $tueTo
     *
     * @return Location
     */
    public function setTueTo($tueTo)
    {
        $this->tueTo = $tueTo;

        return $this;
    }

    /**
     * Get tueTo
     *
     * @return \DateTime
     */
    public function getTueTo()
    {
        return $this->tueTo;
    }

    /**
     * Set wedFrom
     *
     * @param \DateTime $wedFrom
     *
     * @return Location
     */
    public function setWedFrom($wedFrom)
    {
        $this->wedFrom = $wedFrom;

        return $this;
    }

    /**
     * Get wedFrom
     *
     * @return \DateTime
     */
    public function getWedFrom()
    {
        return $this->wedFrom;
    }

    /**
     * Set wedTo
     *
     * @param \DateTime $wedTo
     *
     * @return Location
     */
    public function setWedTo($wedTo)
    {
        $this->wedTo = $wedTo;

        return $this;
    }

    /**
     * Get wedTo
     *
     * @return \DateTime
     */
    public function getWedTo()
    {
        return $this->wedTo;
    }

    /**
     * Set thuFrom
     *
     * @param \DateTime $thuFrom
     *
     * @return Location
     */
    public function setThuFrom($thuFrom)
    {
        $this->thuFrom = $thuFrom;

        return $this;
    }

    /**
     * Get thuFrom
     *
     * @return \DateTime
     */
    public function getThuFrom()
    {
        return $this->thuFrom;
    }

    /**
     * Set thuTo
     *
     * @param \DateTime $thuTo
     *
     * @return Location
     */
    public function setThuTo($thuTo)
    {
        $this->thuTo = $thuTo;

        return $this;
    }

    /**
     * Get thuTo
     *
     * @return \DateTime
     */
    public function getThuTo()
    {
        return $this->thuTo;
    }

    /**
     * Set friFrom
     *
     * @param \DateTime $friFrom
     *
     * @return Location
     */
    public function setFriFrom($friFrom)
    {
        $this->friFrom = $friFrom;

        return $this;
    }

    /**
     * Get friFrom
     *
     * @return \DateTime
     */
    public function getFriFrom()
    {
        return $this->friFrom;
    }

    /**
     * Set friTo
     *
     * @param \DateTime $friTo
     *
     * @return Location
     */
    public function setFriTo($friTo)
    {
        $this->friTo = $friTo;

        return $this;
    }

    /**
     * Get friTo
     *
     * @return \DateTime
     */
    public function getFriTo()
    {
        return $this->friTo;
    }

    /**
     * Set satFrom
     *
     * @param \DateTime $satFrom
     *
     * @return Location
     */
    public function setSatFrom($satFrom)
    {
        $this->satFrom = $satFrom;

        return $this;
    }

    /**
     * Get satFrom
     *
     * @return \DateTime
     */
    public function getSatFrom()
    {
        return $this->satFrom;
    }

    /**
     * Set satTo
     *
     * @param \DateTime $satTo
     *
     * @return Location
     */
    public function setSatTo($satTo)
    {
        $this->satTo = $satTo;

        return $this;
    }

    /**
     * Get satTo
     *
     * @return \DateTime
     */
    public function getSatTo()
    {
        return $this->satTo;
    }

    /**
     * Set sunFrom
     *
     * @param \DateTime $sunFrom
     *
     * @return Location
     */
    public function setSunFrom($sunFrom)
    {
        $this->sunFrom = $sunFrom;

        return $this;
    }

    /**
     * Get sunFrom
     *
     * @return \DateTime
     */
    public function getSunFrom()
    {
        return $this->sunFrom;
    }

    /**
     * Set sunTo
     *
     * @param \DateTime $sunTo
     *
     * @return Location
     */
    public function setSunTo($sunTo)
    {
        $this->sunTo = $sunTo;

        return $this;
    }

    /**
     * Get sunTo
     *
     * @return \DateTime
     */
    public function getSunTo()
    {
        return $this->sunTo;
    }

    /**
     * Set monClosed
     *
     * @param boolean $monClosed
     *
     * @return Location
     */
    public function setMonClosed($monClosed)
    {
        $this->monClosed = $monClosed;

        return $this;
    }

    /**
     * Get monClosed
     *
     * @return boolean
     */
    public function getMonClosed()
    {
        return $this->monClosed;
    }

    /**
     * Set tueClosed
     *
     * @param boolean $tueClosed
     *
     * @return Location
     */
    public function setTueClosed($tueClosed)
    {
        $this->tueClosed = $tueClosed;

        return $this;
    }

    /**
     * Get tueClosed
     *
     * @return boolean
     */
    public function getTueClosed()
    {
        return $this->tueClosed;
    }

    /**
     * Set wedClosed
     *
     * @param boolean $wedClosed
     *
     * @return Location
     */
    public function setWedClosed($wedClosed)
    {
        $this->wedClosed = $wedClosed;

        return $this;
    }

    /**
     * Get wedClosed
     *
     * @return boolean
     */
    public function getWedClosed()
    {
        return $this->wedClosed;
    }

    /**
     * Set thuClosed
     *
     * @param boolean $thuClosed
     *
     * @return Location
     */
    public function setThuClosed($thuClosed)
    {
        $this->thuClosed = $thuClosed;

        return $this;
    }

    /**
     * Get thuClosed
     *
     * @return boolean
     */
    public function getThuClosed()
    {
        return $this->thuClosed;
    }

    /**
     * Set friClosed
     *
     * @param boolean $friClosed
     *
     * @return Location
     */
    public function setFriClosed($friClosed)
    {
        $this->friClosed = $friClosed;

        return $this;
    }

    /**
     * Get friClosed
     *
     * @return boolean
     */
    public function getFriClosed()
    {
        return $this->friClosed;
    }

    /**
     * Set satClosed
     *
     * @param boolean $satClosed
     *
     * @return Location
     */
    public function setSatClosed($satClosed)
    {
        $this->satClosed = $satClosed;

        return $this;
    }

    /**
     * Get satClosed
     *
     * @return boolean
     */
    public function getSatClosed()
    {
        return $this->satClosed;
    }

    /**
     * Set sunClosed
     *
     * @param boolean $sunClosed
     *
     * @return Location
     */
    public function setSunClosed($sunClosed)
    {
        $this->sunClosed = $sunClosed;

        return $this;
    }

    /**
     * Get sunClosed
     *
     * @return boolean
     */
    public function getSunClosed()
    {
        return $this->sunClosed;
    }
}
