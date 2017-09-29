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
     protected $type;
     /**
      * @ORM\Column(type="text", nullable=true)
      *
      */

    protected $description;
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
     * Default constructor, initializes collections
     */


     /**
     * Constructor
     */
    public function __construct()
    {
        $this->products = new \Doctrine\Common\Collections\ArrayCollection();
          $this->locations = new \Doctrine\Common\Collections\ArrayCollection();
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
    
}
