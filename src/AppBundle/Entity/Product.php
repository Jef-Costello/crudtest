<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Query\ResultSetMapping;
/**
 * @ORM\Entity
 * @ORM\Table(name="products")
  */
class Product
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
     * @ORM\Column(type="text")
     *
     */
    protected $description;
     /**
      *
     * @var \Doctrine\Common\Collections\Collection|Group[]
     * @ORM\ManyToMany(targetEntity="Group", inversedBy="products")
     * @ORM\JoinTable(name="ProductsGroups",
     *      joinColumns={@ORM\JoinColumn(name="pgID", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
     *      )
     **/
    protected $groups;

    /**
     *
    * @var \Doctrine\Common\Collections\Collection|Shop[]
    * @ORM\ManyToMany(targetEntity="Shop", inversedBy="products")
    * @ORM\JoinTable(name="ProductsShops",
    *      joinColumns={@ORM\JoinColumn(name="psID", referencedColumnName="id")},
    *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
    *      )
    **/
   protected $shops;

    /**
     *
    * @var \Doctrine\Common\Collections\Collection|Group[]
    * @ORM\ManyToMany(targetEntity="Location", inversedBy="products")
    * @ORM\JoinTable(name="ProductsLocations",
    *      joinColumns={@ORM\JoinColumn(name="plID", referencedColumnName="id")},
    *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
    *      )
    **/
   protected $locations;

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
      * @ORM\Column(type="text", nullable=true)
      *
      */
     public $distance;
     /**
      * @var \Doctrine\Common\Collections\Collection|Producttype[]
      * Many products have One producttype.
      * @ORM\ManyToOne(targetEntity="Producttype", inversedBy="products")
      * @ORM\JoinColumn(name="producttype_id", referencedColumnName="id")
      */
     protected $producttype;

    public function __construct()
    {
        $this->groups = new \Doctrine\Common\Collections\ArrayCollection();
        $this->locations = new \Doctrine\Common\Collections\ArrayCollection();
        $this->producttype = new \Doctrine\Common\Collections\ArrayCollection();
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
    public function getDist()
    {
        return $this->distance;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Product
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
     * Add group
     *
     * @param \AppBundle\Entity\Group $group
     *
     * @return Product
     */
    public function addGroup(\AppBundle\Entity\Group $group)
    {
        $this->groups[] = $group;

        return $this;
    }

    /**
     * Remove group
     *
     * @param \AppBundle\Entity\Group $group
     */
    public function removeGroup(\AppBundle\Entity\Group $group)
    {
        $this->groups->removeElement($group);
    }

    /**
     * Get groups
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return Product
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
     * Set description
     *
     * @param string $description
     *
     * @return Product
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

public function custom()
{
$em = $this->getDoctrine()->getEntityManager();
$rsm = new ResultSetMapping();
$rsm->addEntityResult('AppBundle\Entity\Product', 'u');
$query = $em->createNativeQuery('SELECT * ,( 6371 * acos( cos( radians(52.101856) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(5.094162) ) + sin( radians(52.101856) ) * sin( radians( lat ) ) ) ) as distance FROM productslocations d INNER JOIN products e ON e.id = d.plID
INNER JOIN location l ON l.id = d.jid
ORDER BY distance');
return $query->getResult();

}
    /**
     * Add shop
     *
     * @param \AppBundle\Entity\Shop $shop
     *
     * @return Product
     */
    public function addShop(\AppBundle\Entity\Shop $shop)
    {
        $this->shops[] = $shop;

        return $this;
    }

    /**
     * Remove shop
     *
     * @param \AppBundle\Entity\Shop $shop
     */
    public function removeShop(\AppBundle\Entity\Shop $shop)
    {
        $this->shops->removeElement($shop);
    }

    /**
     * Get shops
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getShops()
    {
        return $this->shops;
    }

    /**
     * Add location
     *
     * @param \AppBundle\Entity\Location $location
     *
     * @return Product
     */
    public function addLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations[] = $location;

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
     * Has location
     *
     *
     */


    /**
     * Set distance
     *
     * @param string $distance
     *
     * @return Product
     */
    public function setDistance($distance)
    {
        $this->distance = $distance;

        return $this;
    }

    /**
     * Get distance
     *
     * @return string
     */
    public function getDistance()
    {
        return $this->distance;
    }

    /**
     * Set producttype
     *
     * @param \AppBundle\Entity\Producttype $producttype
     *
     * @return Product
     */
    public function setProducttype(\AppBundle\Entity\Producttype $producttype = null)
    {
        $this->producttype = $producttype;

        return $this;
    }

    /**
     * Get producttype
     *
     * @return \AppBundle\Entity\Producttype
     */
    public function getProducttype()
    {
        return $this->producttype;
    }
}
