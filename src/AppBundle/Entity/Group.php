<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Doctrine\Common\Collections\ArrayCollection;
/**
 * @ORM\Entity
 * @ORM\Table(name="groups")
  */
class Group
{

     /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    protected $pgID;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    protected $name;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $imgUrl;

	/**
	 * @var \Doctrine\Common\Collections\Collection|Product[]
	 *
     * @ORM\ManyToMany(targetEntity="Product", mappedBy="groups")
	 * @ORM\JoinTable(name="productsgroups",
     *      joinColumns={@ORM\JoinColumn(name="pgID", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="jid", referencedColumnName="id")}
     *      )
     **/
    private $products;


    /**
     * Default constructor, initializes collections
     */

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->products = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @return Group
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
     * Add products
     *
     * @param \AppBundle\Entity\Product $products
     * @return Group
     */
    public function addProduct(\AppBundle\Entity\Product $products)
    {
        $products->addGroup($this);
		$this->products[] = $products;

        return $this;
    }

    /**
     * Remove products
     *
     * @param \AppBundle\Entity\Product $products
     */
    public function removeProduct(\AppBundle\Entity\Product $products)
    {
       $products->removeGroup($this);
		$this->products[] = $products;

        return $this;
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
    public function hasProduct() {
        return !$this->products->isEmpty();
}

public function __toString() {
    return $this->name;
}



    /**
     * Set imgUrl
     *
     * @param string $imgUrl
     *
     * @return Group
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
}
